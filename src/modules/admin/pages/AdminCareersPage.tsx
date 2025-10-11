import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, Briefcase, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { z } from "zod";
import type { Page } from "@myhealthintegral/shared";

const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Employment type is required"),
  sideDescription: z.string().optional(),
  applyUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPublished: z.boolean(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const departments = [
  "Technology",
  "Design",
  "Healthcare",
  "Business",
  "Operations",
  "Content",
  "Finance/Legal",
];

const employmentTypes = [
  "Full-time",
  "Contract",
  "Internship",
  "Hybrid",
  "Volunteer",
];

const locations = [
  "Abuja/Lagos (Hybrid)",
  "Remote",
];

export default function AdminCareersPage() {
  const { toast } = useToast();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Page | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Page | null>(null);

  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: [api.admin.pages],
  });

  const jobPages = pages.filter((p: Page) => p.pageType === "job");

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
      location: "",
      type: "",
      sideDescription: "",
      applyUrl: "",
      isPublished: false,
    },
  });

  const saveJobMutation = useMutation({
    mutationFn: async (data: JobFormData) => {
      const slug = editingJob?.slug || `career/${Date.now()}-${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      
      const pageData = {
        title: data.title,
        slug,
        description: data.description,
        pageType: "job",
        category: data.department,
        metaTitle: `${data.title} - Career Opportunity | My Health Integral`,
        metaDescription: data.description,
        isPublished: data.isPublished,
        metadata: {
          department: data.department,
          location: data.location,
          type: data.type,
          sideDescription: data.sideDescription || "",
          applyUrl: data.applyUrl || "",
        },
      };

      if (editingJob) {
        return apiRequest(api.admin.page(editingJob.id), "PUT", pageData);
      }
      return apiRequest(api.admin.pages, "POST", pageData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsFormDialogOpen(false);
      setEditingJob(null);
      form.reset();
      toast({
        title: editingJob ? "Job updated" : "Job posted",
        description: `The job posting has been ${editingJob ? "updated" : "created"} successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save job posting",
        variant: "destructive",
      });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: string) => apiRequest(api.admin.page(id), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);
      toast({
        title: "Job deleted",
        description: "The job posting has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job posting",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      apiRequest(api.admin.page(id), "PUT", { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      toast({
        title: "Job status updated",
        description: "The job posting visibility has been updated.",
      });
    },
  });

  const handleEdit = (job: Page) => {
    setEditingJob(job);
    const metadata = job.metadata as any;
    form.reset({
      title: job.title,
      description: job.description || "",
      department: metadata?.department || "",
      location: metadata?.location || "",
      type: metadata?.type || "",
      sideDescription: metadata?.sideDescription || "",
      applyUrl: metadata?.applyUrl || "",
      isPublished: job.isPublished || false,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (job: Page) => {
    setJobToDelete(job);
    setIsDeleteDialogOpen(true);
  };

  const handleNewJob = () => {
    setEditingJob(null);
    form.reset({
      title: "",
      description: "",
      department: "",
      location: "",
      type: "",
      sideDescription: "",
      applyUrl: "",
      isPublished: false,
    });
    setIsFormDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Career Postings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage job openings and career opportunities</p>
        </div>
        <Button onClick={handleNewJob} data-testid="button-new-job">
          <Plus className="mr-2 h-4 w-4" />
          New Job Posting
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading job postings...</p>
        </div>
      ) : jobPages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No job postings yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first job posting</p>
            <Button onClick={handleNewJob}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobPages.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {job.isPublished ? (
                        <Badge variant="default" className="bg-green-600">
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Badge variant="outline">{(job.metadata as any)?.department}</Badge>
                      <Badge variant="outline">{(job.metadata as any)?.location}</Badge>
                      <Badge variant="outline">{(job.metadata as any)?.type}</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/${job.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" data-testid={`view-job-${job.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublishMutation.mutate({ id: job.id, isPublished: !job.isPublished })}
                      disabled={togglePublishMutation.isPending}
                    >
                      {job.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(job)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(job)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Job Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job Posting" : "New Job Posting"}</DialogTitle>
            <DialogDescription>
              {editingJob ? "Update the job posting details below" : "Fill in the details to create a new job posting"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveJobMutation.mutate(data))} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Full-Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief overview of the role (shows in listings and at top of job page)..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sideDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sidebar Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information shown in the sidebar (e.g., benefits, perks, team culture)..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rich Content Info */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📝 Adding Full Job Content</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  To add detailed job content (responsibilities, qualifications, requirements, benefits, etc.), first save this job, then:
                </p>
                <ol className="text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside space-y-1">
                  <li>Click "View Job Page" from the job card</li>
                  <li>Turn on "Edit Mode" (toggle at top)</li>
                  <li>Click "+ Add Content Block" to add rich text sections</li>
                  <li>Save each section with Ctrl+Enter</li>
                </ol>
                {editingJob && (
                  <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                    <Link href={`/${editingJob.slug}?edit=true`} target="_blank">
                      <Button variant="outline" size="sm" className="w-full" type="button">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Edit Full Content for This Job
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Link (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/apply or leave empty for contact form" 
                        {...field} 
                        data-testid="input-apply-url"
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Custom URL for the "Apply Now" button. Leave empty to use the default contact form.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish Job</FormLabel>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Make this job posting visible on the careers page
                      </div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveJobMutation.isPending}>
                  {saveJobMutation.isPending ? "Saving..." : editingJob ? "Update Job" : "Create Job"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job Posting</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => jobToDelete && deleteJobMutation.mutate(jobToDelete.id)}
              disabled={deleteJobMutation.isPending}
            >
              {deleteJobMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
