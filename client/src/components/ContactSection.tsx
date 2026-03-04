import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContact } from "@/hooks/use-contact";
import { MagneticButton } from "./MagneticButton";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { mutateAsync: sendContact, isPending } = useCreateContact();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      await sendContact(data);
      toast({
        title: "Message Received",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to send message",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-background">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--cobalt))]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">Start a project</h2>
            <h3 className="text-5xl font-bold text-foreground mb-8 leading-tight">
              Ready to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))]">Innovate?</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-md mb-12">
              Drop us a line and let's discuss how we can transform your business with cutting-edge technology.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Location</p>
                <p className="text-foreground text-lg font-medium">Silicon Valley, CA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Email</p>
                <a href="mailto:hello@savistatech.com" className="text-foreground text-lg font-medium hover:text-[hsl(var(--cyan))] transition-colors">hello@savistatech.com</a>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Your Name</label>
                <input 
                  {...register("name")}
                  className="w-full bg-muted border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--cyan))] focus:ring-1 focus:ring-[hsl(var(--cyan))]/50 transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <input 
                  {...register("email")}
                  type="email"
                  className="w-full bg-muted border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--cyan))] focus:ring-1 focus:ring-[hsl(var(--cyan))]/50 transition-all"
                  placeholder="john@company.com"
                />
                {errors.email && <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Project Details</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  className="w-full bg-muted border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--cyan))] focus:ring-1 focus:ring-[hsl(var(--cyan))]/50 transition-all resize-none"
                  placeholder="Tell us about your vision..."
                />
                {errors.message && <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.message.message}</span>}
              </div>

              <MagneticButton type="submit" disabled={isPending} className="w-full flex justify-center py-5">
                {isPending ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
