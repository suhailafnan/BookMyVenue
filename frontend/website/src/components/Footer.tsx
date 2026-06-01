export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Cancellation Options</li>
              <li>Safety Information</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Hosting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Become a Host</li>
              <li>Host Resources</li>
              <li>Community Forum</li>
              <li>Hosting Guidelines</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

        </div>

        <hr className="my-6" />

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>© 2026 BookMyVenue. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">X</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}