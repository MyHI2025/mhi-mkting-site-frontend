import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, Image as ImageIcon, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import {
  insertTeamMemberSchema,
  type TeamMember,
  type MediaAsset,
  TITLE_OPTIONS,
} from "@myhi2025/shared";
import { z } from "zod";
import { MediaPicker } from "../components/MediaPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TeamMemberForm = z.infer<typeof insertTeamMemberSchema>;

export default function AdminTeamPage() {
  const { toast } = useToast();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: [api.admin.team],
  });

  // Form
  const form = useForm<TeamMemberForm>({
    resolver: zodResolver(insertTeamMemberSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      role: "",
      bio: "",
      photoUrl: null,
      linkedin: null,
      achievements: [],
      displayOrder: 0,
      isVisible: true,
    },
  });

  // Create/Update mutation
  const saveMemberMutation = useMutation({
    mutationFn: (data: TeamMemberForm) => {
      if (editingMember) {
        return apiRequest(api.admin.teamMember(editingMember.id), "PUT", data);
      }
      return apiRequest(api.admin.team, "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.team] });
      queryClient.invalidateQueries({ queryKey: [api.public.team] });
      setIsFormDialogOpen(false);
      setEditingMember(null);
      setSelectedPhotoUrl(null);
      form.reset();
      toast({
        title: editingMember ? "Team member updated" : "Team member added",
        description: `The team member has been ${
          editingMember ? "updated" : "added"
        } successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save team member",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMemberMutation = useMutation({
    mutationFn: (id: string) => apiRequest(api.admin.teamMember(id), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.team] });
      queryClient.invalidateQueries({ queryKey: [api.public.team] });
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
      toast({
        title: "Team member deleted",
        description: "The team member has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete team member",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setSelectedPhotoUrl(member.photoUrl);
    form.reset({
      title: member.title || "",
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      bio: member.bio || "",
      photoUrl: member.photoUrl,
      linkedin: member.linkedin,
      achievements: member.achievements || [],
      displayOrder: member.displayOrder || 0,
      isVisible: member.isVisible,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (member: TeamMember) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleMediaSelect = (media: MediaAsset) => {
    setSelectedPhotoUrl(media.url);
    form.setValue("photoUrl", media.url);
  };

  const handleNewMember = () => {
    setEditingMember(null);
    setSelectedPhotoUrl(null);
    form.reset({
      title: "",
      firstName: "",
      lastName: "",
      role: "",
      bio: "",
      photoUrl: null,
      linkedin: null,
      achievements: [],
      displayOrder: teamMembers.length,
      isVisible: true,
    });
    setIsFormDialogOpen(true);
  };

  const onSubmit = (data: TeamMemberForm) => {
    saveMemberMutation.mutate(data);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8" />
              Team Members
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your team member profiles and photos
            </p>
          </div>
          <Button
            data-testid="button-add-team-member"
            onClick={handleNewMember}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading...
        </div>
      ) : teamMembers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No team members yet. Add your first one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id} data-testid={`card-team-member-${member.id}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={`${member.title || ""} ${member.firstName} ${
                          member.lastName
                        }`.trim()}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold truncate"
                      data-testid={`text-member-name-${member.id}`}
                    >
                      {member.title ? `${member.title} ` : ""}
                      {member.firstName} {member.lastName}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-testid={`text-member-role-${member.id}`}
                    >
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {member.bio}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-muted-foreground">
                        Order: {member.displayOrder}
                      </span>
                      {!member.isVisible && (
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-2 py-0.5 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    data-testid={`button-edit-team-member-${member.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    data-testid={`button-delete-team-member-${member.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
            <DialogDescription>
              {editingMember
                ? "Update team member details"
                : "Add a new team member to your website"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Photo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Photo</label>
                <div className="flex items-center gap-4">
                  {selectedPhotoUrl ? (
                    <img
                      src={selectedPhotoUrl}
                      alt="Selected"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <Button
                    data-testid="button-select-photo"
                    type="button"
                    variant="outline"
                    onClick={() => setIsMediaPickerOpen(true)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select Photo
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-member-title">
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TITLE_OPTIONS.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-member-first-name"
                          placeholder="First name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-member-last-name"
                          placeholder="Last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-member-role"
                        placeholder="CEO & Co-Founder"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        data-testid="input-member-bio"
                        placeholder="Brief description about the team member..."
                        className="min-h-24"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-member-linkedin"
                        placeholder="https://linkedin.com/in/..."
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-member-order"
                        type="number"
                        {...field}
                        value={field.value || 0}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Visible on website
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Show this team member on the public website
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        data-testid="switch-member-visible"
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  data-testid="button-cancel-member-form"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormDialogOpen(false);
                    setEditingMember(null);
                    setSelectedPhotoUrl(null);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  data-testid="button-save-member"
                  type="submit"
                  disabled={saveMemberMutation.isPending}
                >
                  {saveMemberMutation.isPending
                    ? "Saving..."
                    : editingMember
                    ? "Update"
                    : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              {memberToDelete
                ? `${memberToDelete.title || ""} ${memberToDelete.firstName} ${
                    memberToDelete.lastName
                  }`.trim()
                : ""}
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              data-testid="button-cancel-delete"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setMemberToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              data-testid="button-confirm-delete"
              variant="destructive"
              onClick={() =>
                memberToDelete && deleteMemberMutation.mutate(memberToDelete.id)
              }
              disabled={deleteMemberMutation.isPending}
            >
              {deleteMemberMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Media Picker */}
      <MediaPicker
        open={isMediaPickerOpen}
        onOpenChange={setIsMediaPickerOpen}
        onSelect={handleMediaSelect}
        selectedMediaId={null}
      />
    </div>
  );
}
