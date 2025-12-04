import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Company Column */}
        <div>
          <h3 className="text-lg font-bold mb-6">Company</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Team</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-lg font-bold mb-6">Contact</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Help & Support</a></li>
            <li><a href="#" className="hover:text-white transition">Partner with us</a></li>
            <li><a href="#" className="hover:text-white transition">Ride with us</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="text-lg font-bold mb-6">Legal</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Refund & Cancellation</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Follow Us Column */}
        <div>
          <h3 className="text-xs font-bold mb-6 uppercase tracking-wider text-gray-400">Follow Us</h3>
          <div className="flex gap-4 mb-8">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm-1.634 7.676a.75.75 0 10-1.06-1.06l-2.75 2.75a.75.75 0 000 1.06l2.75 2.75a.75.75 0 001.06-1.06l-1.47-1.47H16a.75.75 0 000-1.5h-6.78l1.47-1.47z" clipRule="evenodd" /><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 100 6 3 3 0 000-6z" /></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
          </div>
          <p className="text-sm text-gray-400 mb-4">Receive exclusive offers in your mailbox</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter Your email"
                className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md text-sm w-full border-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
              />
            </div>
            <button className="bg-amber-500 text-white px-6 py-3 rounded-md text-sm font-bold shadow-lg hover:bg-amber-600 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>All rights Reserved</span>
          <span>©</span>
          <span className="font-bold text-white">Dawit PLC, 2025</span>
        </div>
        <div className="flex items-center gap-1 mt-4 md:mt-0">
          <span>Made with</span>
          <span className="text-yellow-500">💛</span>
          <span>by</span>
          <span className="font-bold text-white">Dawit</span>
        </div>
      </div>
    </footer>
  )
}
