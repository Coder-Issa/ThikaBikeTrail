
import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PhoneInput } from "../components/PhoneInput";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate sending form data to server
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-bike-dark mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? Reach out to our team using the form below
            or visit us at our shop in Thika.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-bike-dark">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <PhoneInput 
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="For fast response,click the email at the contact form below."
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-bike hover:bg-bike-dark"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-bike-dark">Our Location</h2>
              <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden mb-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1751898866134!2d37.074799214665745!3d-1.0424580992915626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e841ee76ff3%3A0x6e0a9de147f61ef!2sMt%20Kenya%20University%2C%20Thika!5e0!3m2!1sen!2sus!4v1650282938741!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-gray-700">
                Located near Mt. Kenya University, Baghdad Street, Thika, Kenya
                <br />
                <span className="text-sm text-gray-500">
                  X33R+3G3 Baghdad Street, Thika, Kenya
                </span>
              </p>
            </div>

            <div className="bg-bike-dark text-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-bike-accent/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+254 799353813</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-bike-accent/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto: thikabiketrail@gmail.com" ><i className='bx bxs-envelope'></i>thikabiketrail@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-bike-dark">Working Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>10:00am - 7:00pm</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Friday</span>
                  <span className="text-bike-secondary font-bold">Closed</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Saturday - Sunday</span>
                  <span>10:00am - 7:00pm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;