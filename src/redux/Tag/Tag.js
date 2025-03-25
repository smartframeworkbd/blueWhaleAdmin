export const tags = [
 
  // Admin
  {
    name: 'Admin', 
    tag: 'admin', 
  },
  {
    name: 'FAQ', 
    tag: 'faqs', 
  },
  {
    name: 'breakingnews', 
    tag: 'BreakingNews', 
  },
  {
    name: 'Hotspot', 
    tag: 'hotSpot', 
  },
  {
    name: 'WelcomeSection', 
    tag: 'welcomesection', 
  },
  {
    name: 'Header', 
    tag: 'header', 
  },
  {
    name: 'Footer', 
    tag: 'footer', 
  },
  {
    name: 'Content', 
    tag: 'content', 
  },

  {
    name: 'Users',
    tag: 'user'
  },
  {
    name: 'Email',
    tag: 'email'
  },


  // User
  {
    name: 'Grievance',
    tag: 'grievances'
  },
  {
    name: 'User',
    tag: 'users'
  },


];

export const getTagsByModuleName = (moduleName) => {
  return tags
    .filter(tag => tag.name.toLowerCase() === moduleName.toLowerCase())
    .map(tag => tag.tag);
};