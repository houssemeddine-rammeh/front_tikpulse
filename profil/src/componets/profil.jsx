import React, { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  BanknotesIcon,
  UserIcon,
  FilmIcon,
  HeartIcon,
  EyeIcon,
  UserGroupIcon,
  LinkIcon,
  CreditCardIcon,
  CameraIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

const CreatorProfile = () => {
  const [profile, setProfile] = useState({
    id: 'ID-789456123',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    username: '@dance_sarah',
    category: 'Dance',
    bio: 'Professional dancer sharing tips & choreography. LA based. Available for collabs.',
    joinedDate: 'October 2021',
    following: 352,
    videos: 230,
    followers: 1500000,
    likes: 25000000,
    views: 75000000,
    phone: '+1 (555) 123-4567',
    email: 'creator@tikpulse.com',
    contractStart: 'January 15, 2024',
    daysWithAgency: 145,
    contractDuration: '12 months',
    diamondsCollected: 75800,
    rib: 'FR76 3000 4000 0100 0000 1234 567',
    paypal: 'creator@tikpulse.com'
  });

  const [editMode, setEditMode] = useState(false);
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [tempPhoto, setTempPhoto] = useState('');
  const [tempProfile, setTempProfile] = useState({});
  const [editContactMode, setEditContactMode] = useState(false);

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePhoto = () => {
    if (tempPhoto) {
      setProfile(prev => ({
        ...prev,
        profilePhoto: tempPhoto
      }));
    }
    setPhotoEditMode(false);
    setTempPhoto('');
  };

  const startEdit = () => {
    setTempProfile({...profile});
    setEditMode(true);
  };

  const startContactEdit = () => {
    setTempProfile({...profile});
    setEditContactMode(true);
  };

  const saveChanges = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const saveContactChanges = () => {
    setProfile(prev => ({
      ...prev,
      email: tempProfile.email || prev.email,
      phone: tempProfile.phone || prev.phone
    }));
    setEditContactMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Profile Header with Photo */}
      <div className="flex items-start mb-6">
        <div className="relative group">
          <img 
            src={profile.profilePhoto} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-pink-200"
          />
          <button 
            onClick={() => setPhotoEditMode(true)}
            className="absolute bottom-0 right-0 bg-pink-500 text-white p-1.5 rounded-full hover:bg-pink-600 transition-colors"
          >
            <CameraIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">My Profile</h1>
          <div className="flex items-center mb-1">
            <h2 className="text-xl font-semibold text-gray-700 mr-2">My Profile</h2>
            <span className="text-gray-600">{profile.username}</span>
            <span className="mx-2 text-gray-400">·</span>
            <span className="text-gray-600">{profile.category}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <IdentificationIcon className="h-4 w-4 mr-1" />
            <span>{profile.id}</span>
          </div>
          <p className="text-gray-700">{profile.bio}</p>
        </div>
      </div>

      {/* Photo Edit Modal */}
      {photoEditMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <PencilIcon className="h-5 w-5 mr-2" />
              Change Profile Photo
            </h3>
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={tempPhoto || profile.profilePhoto} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors">
                <span className="flex items-center">
                  <CameraIcon className="h-5 w-5 mr-2" />
                  Upload New Photo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button 
                onClick={() => {
                  setPhotoEditMode(false);
                  setTempPhoto('');
                }}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
              >
                <XMarkIcon className="h-5 w-5 mr-1" />
                Cancel
              </button>
              <button 
                onClick={savePhoto}
                className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-md"
              >
                <CheckIcon className="h-5 w-5 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start">
          <CalendarIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Joined</p>
            <p className="font-medium">{profile.joinedDate}</p>
          </div>
        </div>
        <div className="flex items-start">
          <UserGroupIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Following</p>
            <p className="font-medium">{profile.following.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start">
          <FilmIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Videos</p>
            <p className="font-medium">{profile.videos.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start">
          <UserIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Followers</p>
            <p className="font-medium">{profile.followers.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start">
          <HeartIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Likes</p>
            <p className="font-medium">{profile.likes.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start">
          <EyeIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">Views</p>
            <p className="font-medium">{profile.views.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="space-y-3 mb-6 border border-gray-200 rounded-lg p-4 relative">
        <div className="absolute top-4 right-4">
          <button 
            onClick={startContactEdit}
            className="text-pink-500 hover:text-pink-600"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
        {editContactMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                Phone
              </label>
              <input
                type="tel"
                defaultValue={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
                Email
              </label>
              <input
                type="email"
                defaultValue={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button 
                onClick={() => setEditContactMode(false)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
              >
                <XMarkIcon className="h-5 w-5 mr-1" />
                Cancel
              </button>
              <button 
                onClick={saveContactChanges}
                className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-md"
              >
                <CheckIcon className="h-5 w-5 mr-1" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {profile.phone}
              </p>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {profile.email}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contract Details */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <LinkIcon className="h-5 w-5 text-gray-500 mr-2" />
          Contract Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="flex items-start">
            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">Contract Start</p>
              <p className="font-medium">{profile.contractStart}</p>
            </div>
          </div>
          <div className="flex items-start">
            <ClockIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">Days with Agency</p>
              <p className="font-medium">{profile.daysWithAgency}</p>
            </div>
          </div>
          <div className="flex items-start">
            <ClockIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">Contract Duration</p>
              <p className="font-medium">{profile.contractDuration}</p>
            </div>
          </div>
          <div className="flex items-start">
            <BanknotesIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">Diamonds Collected</p>
              <p className="font-medium">{profile.diamondsCollected.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCardIcon className="h-5 w-5 text-gray-500 mr-2" />
          Payment Details
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <BanknotesIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">RIB (Bank Account)</p>
              <p className="font-medium">{profile.rib}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CreditCardIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">PayPal Account</p>
              <p className="font-medium">{profile.paypal}</p>
            </div>
          </div>
        </div>
      </div>



              
        
              
             

           

              
            </div>
        

      )}




export default CreatorProfile;