import { ref, get, update , onValue} from "firebase/database";
import db from "./config/firebase-config";

const siteCollectionRef = ref(db, "Site");
const checklistsCollectionRef = ref(db, "Checklist_M");
const technicianCollectionRef = ref(db, "Tech_M")
const mloadsCollectionRef = ref(db, "mloads/12");


// fetching all the site records with real time updates
export function subscribeToSiteRecords(callback) {
  try {
    // Use onValue to listen for real-time updates
    return onValue(siteCollectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Realtime Database data into an array of objects
        const siteRecords = Object.keys(data).map((key) => ({
          id: key, // Use the unique key as the `id`
          ...data[key], // Spread the data associated with this key
        }));
        callback(siteRecords);
      } else {
        console.log("No data found in the database.");
        callback([]);
      }
    });
  } catch (error) {
    console.error("Error in subscribeToSiteRecords:", error.message);
  }
}

// Updating a site record in the database
export const updateSiteRecord = async (recordID, updatedData) => {
  try {
    const recordPath = `Site/${recordID}`; // Path to the specific entry
    const recordRef = ref(db, recordPath);
    console.log("update site record api run")

    await update(recordRef, updatedData); // Update specific fields
    return true
  } catch (error) {
    return error
  }
};

// fetching the cmr sites
export function getCmrSites() {
  try {
    return get(siteCollectionRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cmrSites = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((site) => site.gen_cm === "y");
        return cmrSites;
      }
      return [];
    });
  } catch (error) {
    console.error("Error in getCmrSites:", error.message);
  }
}

// fetching the pmr sites
export function getPmrSites() {
  try {
    return get(siteCollectionRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pmrSites = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((site) => site.gen_pm === "y");
        return pmrSites;
      }
      return [];
    });
  } catch (error) {
    console.error("Error in getPmrSites:", error.message);
  }
}

// fetching the cmr sites
export function getWoSites() {
  try {
    return get(siteCollectionRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const woSites = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((site) => site.gen_tt_wo === "y");
        return woSites;
      }
      return [];
    });
  } catch (error) {
    console.error("Error in getWoSites:", error.message);
  }
}

// fetching the reports data 
export function getReportsData() {
  try {
    return get(checklistsCollectionRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        return Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
      return [];
    });
    
  } catch (error) {
    console.log("Error in getReportsData:", error.message);
  }
}

// fetching the technician data
export function getTechnicians(){
  try {
    return get(technicianCollectionRef).then((snapshot)=>{
      const data = snapshot.val();
      if(data){
        const tech = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((tech) => tech.Tposition === "Technician");
        return tech;
      }
      return [];
    }) 
  } catch (error) {
    console.log("Error in getReportsData:", error.message);
  }
}
// fetching the inspectors data
export function getInspectors(){
  try {
    return get(technicianCollectionRef).then((snapshot)=>{
      const data = snapshot.val();
      if(data){
        const tech = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((tech) => tech.Tposition !== "Technician");
        return tech;
      }
      return [];
    }) 
  } catch (error) {
    console.log("Error in getInspectors:", error.message);
  }
}

// Function to get mImageURL values for a specific reportNo
export async function getImageURLsForReport(reportNo) {
  try {
    const mloadsRef = ref(db, `mloads/12`);
    const snapshot = await get(mloadsRef);
    const data = snapshot.val();

    if (data && data[reportNo]) {
      const report = data[reportNo];
      const imageURLs = [];

      
        // If date is not provided, extract all image URLs for the reportNo
        Object.keys(report).forEach(key => {
          if (report[key].mImageURL) {
            imageURLs.push(report[key].mImageURL);
          }
        });
      

      return imageURLs;
    } else {
      throw new Error(`Report with reportNo ${reportNo} not found`);
    }
  } catch (error) {
    console.log("Error in getImageURLsForReport:", error.message);
    return [];
  }
}