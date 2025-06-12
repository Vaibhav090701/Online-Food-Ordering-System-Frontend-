
import { useState } from 'react';
import { 
  AccountCircle, 
  Edit,  
  Logout, 
  Person, 
  Lock, 
  Palette, 
  Notifications, 
  CreditCard, 
  History, 
  RocketLaunch, 
  Settings, 
  Public, 
  HelpOutline , 
  Security, 
  Description 
} from '@mui/icons-material';
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Action';

export default function SettingsPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate=useNavigate();
  const {auth}=useSelector(store=>store);
  const dispatch=useDispatch();

  // Mock user data (replace with actual user data from your auth system)
  const user = {
    username: auth.user?.name,
    profilePicture: null, // Replace with actual profile picture URL if available
  };


  const handleLogout = () => {
    setIsLoggingOut(true);
     dispatch(logout());
       navigate('/');
  };

  const baseUrl="/my-profile/setting"

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          name: 'Profile',
          description: 'Update your profile details',
          icon: AccountCircle,
          onClick:()=>navigate(`${baseUrl}/profile`),
        },
        {
          name: 'Password & Security',
          description: 'Update your password and security settings',
          icon: Lock,
          onClick:()=>navigate(`${baseUrl}/security`),
        },
      
        {
          name: 'Notifications',
          description: 'Configure notification preferences',
          icon: Notifications,
          onClick:()=>navigate(`${baseUrl}/notification`),
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
      
        {
          name: 'Help & Support',
          description: 'Get help or contact support',
          icon: HelpOutline,
          onClick:()=>navigate(`${baseUrl}/help-and-support`),
        },
        {
          name: 'Privacy Policy',
          description: 'Read our privacy policy',
          icon: Security,
          onClick:()=>navigate(`${baseUrl}/privacy-policy`),
        },
        {
          name: 'Terms and Conditions',
          description: 'View our terms and conditions',
          icon: Description,
          onClick:()=>navigate(`${baseUrl}/terms-and-conditions`),
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      {/* Top Section */}
      {/* <TopSection heading="Settings" /> */}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <AccountCircle
                className="w-16 h-16"
                style={{ color: 'var(--secondary-color)' }}
              />
            )}
            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: 'var(--text-color)' }}
              >
                @{user.username}
              </h2>
            </div>
          </div>

        </div>
        <hr
          style={{ borderColor: 'var(--card-border)', borderWidth: '1px' }}
        />

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <div key={index} className="mb-4">
            <h2
              className="text-lg mt-2 mb-2"
              style={{ color: 'var(--secondary-color)' }}
            >
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div
                    onClick={item.onClick}
                    className="flex items-center justify-between py-2 cursor-pointer transition-colors duration-200"
                    style={{
                      ':hover': { backgroundColor: 'var(--hover-bg, #f3f4f6)' }, // Fallback for light mode hover
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="border-0 p-3 rounded-xl"
                        style={{ backgroundColor: 'var(--icon-bg, #FF5722)' }} // Fallback to purple-300
                      >
                        <item.icon
                          className="text-lg"
                          style={{ color: 'var(--primary-color)' }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-base font-bold"
                          style={{ color: 'var(--text-color)' }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--secondary-color)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowForwardIos
                      style={{ color: 'var(--secondary-color)' }}
                    />
                  </div>
                  <hr
                    className="mt-1"
                    style={{ borderColor: 'var(--card-border)', borderWidth: '1px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="max-w-md mx-auto mt-8">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full py-2 px-4 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
            style={{
              backgroundColor: isLoggingOut
                ? 'var(--disabled-bg, #9ca3af)'
                : 'var(--error-color, #ef4444)',
              color: '#ffffff',
              focusRingColor: 'var(--error-color, #ef4444)',
              opacity: isLoggingOut ? 0.5 : 1,
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoggingOut ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Logging Out...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Logout className="mr-2" />
                Logout
              </span>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p
            className="text-sm"
            style={{ color: 'var(--secondary-color)' }}
          >
            foodiee v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}