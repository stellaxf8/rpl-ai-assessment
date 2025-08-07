import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form submission handled
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact Our <span style={{ color: '#cd0000' }}>AI Consulting</span> Team</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ready to accelerate your AI journey? Our expert consultants are here to help you implement 
          tailored AI solutions that drive real business value.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" style={{ color: '#cd0000' }} />
                Get In Touch
              </CardTitle>
              <CardDescription>
                Multiple ways to reach our AI consulting experts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" style={{ color: '#cd0000' }} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-slate-600">+1 (866) 745-5733</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" style={{ color: '#cd0000' }} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-slate-600">info@redpilllabs.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" style={{ color: '#cd0000' }} />
                <div>
                  <p className="font-medium">Red Pill Labs - Head Office</p>
                  <p className="text-sm text-slate-600">
                    Suite 1220 - 1055 West Hastings St.<br />
                    Vancouver, BC V6E 2E9
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" style={{ color: '#cd0000' }} />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-slate-600">
                    Mon-Fri: 9:00 AM - 5:00 PM PST<br />
                    Response within 1-2 business days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" style={{ color: '#cd0000' }} />
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm">AI Strategy Consulting</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm">Implementation Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Software Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">Ongoing Consultation</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" style={{ color: '#cd0000' }} />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Tell us about your AI goals and we'll craft a personalized consultation approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span style={{ color: '#cd0000' }}>*</span></Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span style={{ color: '#cd0000' }}>*</span></Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategy">AI Strategy Consultation</SelectItem>
                      <SelectItem value="assessment">Assessment Review</SelectItem>
                      <SelectItem value="implementation">Implementation Planning</SelectItem>
                      <SelectItem value="training">Team Training</SelectItem>
                      <SelectItem value="ongoing">Ongoing Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message <span style={{ color: '#cd0000' }}>*</span></Label>
                  <Textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your AI goals, current challenges, and how we can help..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}