function getTranslation(path, currentLanguage,labelData) {
    // Split the path into parts
    const pathParts = path.split('.');
    
    // Initialize the translation object with the top-level object
    let translationObject = labelData;

    // Traverse the JSON structure
    for (const part of pathParts) {
        translationObject = translationObject[part];
    }
    // console.log("fffffffff");

    return translationObject[currentLanguage];
};

export default getTranslation;