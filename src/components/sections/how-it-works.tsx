// import { Button } from "@/components/ui/button";
// import { Link } from "wouter";
// import { useMediaPosition } from "@/hooks/use-media-position";
// import { Smartphone, FileText, Video, Package, ArrowRight } from "lucide-react";
// import step1Fallback from "@assets/stock_images/african_patient_usin_d504ed0d.jpg";
// import step2Fallback from "@assets/stock_images/african_doctor_revie_3864277b.jpg";
// import step3Fallback from "@assets/stock_images/african_patient_vide_dfe0765b.jpg";
// import step4Fallback from "@assets/stock_images/african_patient_rece_5974a681.jpg";

// const steps = [
//   {
//     number: "1",
//     icon: Smartphone,
//     title: "Sign Up & Verify",
//     description: "Create your account quickly using your email or phone number. Complete verification to ensure secure access.",
//     mediaKey: "how_it_works_step_1",
//     fallback: step1Fallback,
//     alt: "Patient using smartphone to register on healthcare app"
//   },
//   {
//     number: "2",
//     icon: FileText,
//     title: "Complete Your Profile",
//     description: "Add your medical history, allergies, and current medications to personalize your healthcare experience.",
//     mediaKey: "how_it_works_step_2",
//     fallback: step2Fallback,
//     alt: "Doctor reviewing patient medical records on tablet"
//   },
//   {
//     number: "3",
//     icon: Video,
//     title: "Connect with Doctors",
//     description: "Schedule video consultations with qualified healthcare providers and receive expert medical advice from anywhere.",
//     mediaKey: "how_it_works_step_3",
//     fallback: step3Fallback,
//     alt: "Patient in video consultation with doctor"
//   },
//   {
//     number: "4",
//     icon: Package,
//     title: "Receive Care & Prescriptions",
//     description: "Get digital prescriptions sent directly to partner pharmacies and have medications delivered to your door.",
//     mediaKey: "how_it_works_step_4",
//     fallback: step4Fallback,
//     alt: "Patient receiving medicine prescription delivery"
//   }
// ];

// export default function HowItWorks() {
//   const step1Image = useMediaPosition(steps[0].mediaKey);
//   const step2Image = useMediaPosition(steps[1].mediaKey);
//   const step3Image = useMediaPosition(steps[2].mediaKey);
//   const step4Image = useMediaPosition(steps[3].mediaKey);

//   const stepImages = [step1Image.data, step2Image.data, step3Image.data, step4Image.data];

//   return (
//     <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
//             <ArrowRight className="h-4 w-4" />
//             <span className="text-sm font-semibold">Your Journey to Better Health</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="how-it-works-title">
//             How My Health Integral Works
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="how-it-works-description">
//             From registration to receiving care, we've made digital healthcare simple, secure, and accessible for everyone.
//           </p>
//         </div>

//         {/* Visual Step-by-Step Journey */}
//         <div className="space-y-16 lg:space-y-24">
//           {steps.map((step, index) => {
//             const StepIcon = step.icon;
//             const isReversed = index % 2 !== 0;
//             const stepImage = stepImages[index];

//             return (
//               <div
//                 key={index}
//                 className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
//                 data-testid={`step-${index + 1}`}
//               >
//                 {/* Step Image */}
//                 <div className="relative flex-1 w-full">
//                   <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
//                     <img
//                       src={stepImage?.mediaUrl || step.fallback}
//                       alt={stepImage?.mediaAlt || step.alt}
//                       className="w-full h-80 lg:h-96 object-cover"
//                       data-testid={`step-image-${index + 1}`}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

//                     {/* Floating Step Number Badge */}
//                     <div className="absolute top-6 left-6 bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white/20">
//                       <span className="text-2xl font-bold">{step.number}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step Content */}
//                 <div className="flex-1 w-full space-y-6">
//                   <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-3 rounded-full">
//                     <StepIcon className="h-5 w-5" />
//                     <span className="font-semibold">Step {step.number}</span>
//                   </div>

//                   <h3 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid={`step-title-${index + 1}`}>
//                     {step.title}
//                   </h3>

//                   <p className="text-lg text-muted-foreground leading-relaxed" data-testid={`step-description-${index + 1}`}>
//                     {step.description}
//                   </p>

//                   {/* Progress Indicator */}
//                   {index < steps.length - 1 && (
//                     <div className="flex items-center gap-3 pt-4">
//                       <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary"></div>
//                       <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent"></div>
//                       <span className="text-sm text-muted-foreground">Next Step</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* CTA */}
//         <div className="text-center mt-20">
//           <Link href="/contact#contact-form">
//             <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-lg font-semibold text-lg transition-colors shadow-xl hover:shadow-2xl group" data-testid="button-start-journey">
//               Start Your Healthcare Journey
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//           <p className="mt-4 text-sm text-muted-foreground">Join thousands of satisfied patients already using My Health Integral</p>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMediaPosition } from "@/hooks/use-media-position";
import { Smartphone, FileText, Video, Package, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import step1Fallback from "@assets/stock_images/african_patient_usin_d504ed0d.jpg";
import step2Fallback from "@assets/stock_images/african_doctor_revie_3864277b.jpg";
import step3Fallback from "@assets/stock_images/african_patient_vide_dfe0765b.jpg";
import step4Fallback from "@assets/stock_images/african_patient_rece_5974a681.jpg";

const steps = [
  {
    number: "1",
    icon: Smartphone,
    title: "Sign Up & Verify",
    description:
      "Create your account quickly using your email or phone number. Complete verification to ensure secure access.",
    mediaKey: "how_it_works_step_1",
    fallback: step1Fallback,
    alt: "Patient using smartphone to register on healthcare app",
  },
  {
    number: "2",
    icon: FileText,
    title: "Complete Your Profile",
    description:
      "Add your medical history, allergies, and current medications to personalize your healthcare experience.",
    mediaKey: "how_it_works_step_2",
    fallback: step2Fallback,
    alt: "Doctor reviewing patient medical records on tablet",
  },
  {
    number: "3",
    icon: Video,
    title: "Connect with Doctors",
    description:
      "Schedule video consultations with qualified healthcare providers and receive expert medical advice from anywhere.",
    mediaKey: "how_it_works_step_3",
    fallback: step3Fallback,
    alt: "Patient in video consultation with doctor",
  },
  {
    number: "4",
    icon: Package,
    title: "Receive Care & Prescriptions",
    description:
      "Get digital prescriptions sent directly to partner pharmacies and have medications delivered to your door.",
    mediaKey: "how_it_works_step_4",
    fallback: step4Fallback,
    alt: "Patient receiving medicine prescription delivery",
  },
];

export default function HowItWorks() {
  const images = steps.map((step) => useMediaPosition(step.mediaKey));

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Your Journey to Better Health
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How My Health Integral Works
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From registration to receiving care, we've made digital healthcare
            simple, secure, and accessible for everyone.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={48}
          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          className="max-w-6xl mx-auto"
        >
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const image = images[index].data;

            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                  {/* Image */}
                  <div className="flex-1 w-full">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                      <img
                        src={image?.mediaUrl || step.fallback}
                        alt={image?.mediaAlt || step.alt}
                        className="w-full h-80 lg:h-96 object-cover"
                      />

                      {/* Step Number */}
                      <div className="absolute top-6 left-6 bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-xl font-bold">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full space-y-6">
                    <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-3 rounded-full">
                      <StepIcon className="h-5 w-5" />
                      <span className="font-semibold">Step {step.number}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {step.title}
                    </h3>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link href="/contact#contact-form">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-lg font-semibold text-lg shadow-xl group">
              Start Your Healthcare Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Join thousands of satisfied patients already using My Health
            Integral
          </p>
        </div>
      </div>
    </section>
  );
}
