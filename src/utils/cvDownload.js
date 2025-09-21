// CV Download utility
export const downloadCV = () => {
  // Create a link element
  const link = document.createElement('a');
  
  // Use correct base URL for Vite app
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cvPath = `${baseUrl}Sivasuthakaran_Sanjeev_CV.pdf`;
  
  console.log('Simple download from:', cvPath);
  
  // Set the file path (PDF in public folder) - fixed file name without spaces
  link.href = cvPath;
  
  // Set download attribute with desired filename
  link.download = 'Sivasuthakaran_Sanjeev_CV.pdf';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Optional: Analytics tracking
  console.log('CV downloaded successfully!');
};

// Alternative method using fetch (for better browser support)
export const downloadCVFetch = async () => {
  try {
    // Use correct base URL for Vite app
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Sivasuthakaran_Sanjeev_CV.pdf`;
    
    console.log('Attempting to download CV from:', cvPath);
    
    const response = await fetch(cvPath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sivasuthakaran_Sanjeev_CV.pdf';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    window.URL.revokeObjectURL(url);
    
    console.log('CV downloaded successfully!');
  } catch (error) {
    console.error('Error downloading CV:', error);
    alert('Sorry, there was an error downloading the CV. Please try again.');
  }
};