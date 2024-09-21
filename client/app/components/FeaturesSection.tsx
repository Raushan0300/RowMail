import { FiClock, FiUsers, FiLayers, FiMail, FiFileText, FiUserCheck } from 'react-icons/fi';

const features = [
  { title: 'Schedule Emails', description: 'Choose when your emails are sent with our easy-to-use scheduling tool.', icon: <FiClock size={40} /> },
  { title: 'Personalized Emails', description: 'Send the same email to multiple recipients with personalized variables.', icon: <FiUsers size={40} /> },
  { title: 'Email Templates', description: 'Use pre-designed templates to create beautiful emails in minutes.', icon: <FiLayers size={40} /> },
  { title: 'Track Email Opens', description: 'Get insights on who opened your emails and when.', icon: <FiMail size={40} /> },
  { title: 'Custom Variables', description: 'Create and use custom variables to personalize your email content.', icon: <FiFileText size={40} /> },
  { title: 'Manage Contacts', description: 'Keep your contacts organized and easily accessible.', icon: <FiUserCheck size={40} /> },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;