import { Container } from '@/components/ui/core/Container';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-semibold flex items-center">
              <span className="text-primary mr-1">Meal</span>
              <span>Box</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Connecting customers with meal providers for personalized, convenient dining
              experiences. Simplifying healthy eating for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              For Customers
            </h3>
            <ul className="space-y-3">
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Find Meals
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Order Meal
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Dashboard
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              For Providers
            </h3>
            <ul className="space-y-3">
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Post Meal Menu
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Order Responses
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Dashboard
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} MealBox. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
