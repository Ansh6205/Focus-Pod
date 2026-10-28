import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from 'figma:asset/5666512ea0ca615ae6eb1feaadbc1adf8e76dc34.png';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src={logoImage} 
                alt="FocusPod Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm mb-4">
              Your personalized productivity zone. Study smarter, work better, achieve more.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Procedures</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Hourly Booking</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Monthly Plans</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Semester Pass</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Institutional Partnership</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Franchise Opportunities</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-teal-400" />
                <span>123 Campus Road, Tech City, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-teal-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-teal-400" />
                <span>info@focuspod.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2025 FocusPod. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Founded by:</span>
              <span className="text-teal-400 font-semibold">Vivek Humbe</span>
              <span>&</span>
              <span className="text-teal-400 font-semibold">Ansh Kumbhare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}