import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Resend } from "resend";
import Email from "../emails/my-email";

const resend = new Resend("re_fZ7QQkjK_R7erRs3hLa4J6oxJ36rJjLyo");

// export const Label = ({ children }) => {
//   return (
//     <label className="text-md text-slate-800 flex gap-1 items-center">
//       {children}
//     </label>
//   );
// };

const userScheme = z.object({
  username: z.string(),
});

//console.log(userScheme.safeParse({ username: "jamal" }));

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    required_error: "Email filed is not empty",
  }),
  proffession: z
    .string({
      required_error: "Please add your proffssion",
      invalid_type_error: "Proffession Must be string",
    })
    .min(1),
  subject: z.string(),
  message: z
    .string()
    .min(100, {
      message: "Message should be minimum than 100 charectors",
    })
    .max(500, {
      message: "Message should be less than 500 charectors",
    }),
  acceptTerm: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  preferlang: z.boolean().optional(),
});

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      proffession: "",
      subject: "",
      message: "",
      acceptTerm: false,
      preferlang: false,
    },
  });

  function onSubmit(values) {
    //console.log(values);
    formSchema.parse(values);
    setFormStatus(true);
  }

  const sendEmail = async (req, res) => {
    try {
      // Customize the email options with Resend
      const emailResponse = await resend.sendEmail({
        from: "contact@crewindui.com",
        to: "jamalbe2004@gmail.com",
        subject: "hello world from React Email",
        react: <Email url="https://example.com" />,
      });

      res.status(200).json({ success: true, emailResponse });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }

    return false;
  };

  return (
    <>
      <Button onClick={() => sendEmail()}>Send Email</Button>
      <Form {...form}>
        <div className="p-10">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className=" text-slate-500 text-succ">
              Get in touch with our team to learn more about web development.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl mx-auto p-6"
          >
            {formStatus && (
              <Alert className="text-success bg-success-foreground border-success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your request has been sent successfully.
                </AlertDescription>
              </Alert>
            )}

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName">
                      First Name
                      <Popover>
                        <PopoverTrigger>
                          <Info size={16} />
                        </PopoverTrigger>
                        <PopoverContent>
                          Place content for the popover here.
                        </PopoverContent>
                      </Popover>
                    </Label>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="Ex: Ahmed"
                        {...field}
                        className="h-16 text-base hover:border-primary"
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
                    <Label htmlFor="lastName">Last Name</Label>
                    <FormControl>
                      <Input
                        id="lastName"
                        placeholder="Ex: Aziz"
                        {...field}
                        className="h-16 text-base hover:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ex: email@email.com"
                      {...field}
                      className="h-16 text-base hover:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proffession"
              render={({ field }) => (
                <FormItem>
                  <Label>Proffession</Label>
                  <FormControl>
                    <Input
                      type="proffession"
                      placeholder="Ex: software engineer"
                      {...field}
                      className="h-16 text-base hover:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Label>Subject</Label>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-16 text-base  hover:border-primary">
                        <SelectValue placeholder="Choose the Subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-primary">
                        <SelectItem
                          value="customer"
                          className="h-12 text-base hover:bg-primary hover:text-white"
                        >
                          Customer Support
                        </SelectItem>
                        <SelectItem
                          value="enhancement"
                          className="h-12 text-base hover:bg-primary hover:text-white"
                        >
                          Enhancement
                        </SelectItem>
                        <SelectItem
                          value="system"
                          className="h-12 text-base hover:bg-primary hover:text-white"
                        >
                          System Support
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Label>Message</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Add More information about your queries"
                      {...field}
                      className=" hover:border-primary h-36 text-base"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerm"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
                    <FormControl>
                      <Checkbox
                        className="w-6 h-6 border-slate-300 checked:bg-primary"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base">
                        Accept Terms and Conditions to proceed
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>

                  <ScrollArea className="h-[200px] rounded-md text-sm leading-relaxed border p-4 border-primary text-slate-400">
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                  </ScrollArea>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="preferlang"
              render={({ field }) => (
                <>
                  <FormLabel className="flex gap-2 items-center">
                    <Switch
                      id="prefLang"
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="prefLang">Prefered Language</Label>
                  </FormLabel>
                </>
              )}
            />

            <Button type="submit" className="w-full h-16 text-lg">
              Accept and Continue
            </Button>

            <Dialog>
              <DialogTrigger>
                <span>If you dont have account yet? Sign Up</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </form>
        </div>
      </Form>
    </>
  );
};

export default Contact;
