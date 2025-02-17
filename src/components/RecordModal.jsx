import React, { useState } from 'react';
import { updateSiteRecord } from '../api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RecordModal = ({ record, handleClose }) => {
    console.log(record);
    const [formData, setFormData] = useState({
        siteID: record.siteID,
        region: record.region,
        tecName: record.tec_name,
        tecPhone: record.tec_mob,
        mdCap: record.gen_md_cap,
        cm: record.gen_cm === "y" ? true : false,
        pm: record.gen_pm === "y" ? true : false,
        wo: record.gen_tt_wo === "y" ? true : false,
        news: record.site_news || "", // Initialize the news field
    });

    // Update formData dynamically
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Prevent the modal from closing when clicking inside the modal container
    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    function handleUpdate(e) {
        e.preventDefault();
        const recordID = record.id;
        const updatedData = {
            siteID: formData.siteID,
            region: formData.region,
            gen_md_cap: formData.mdCap,
            tec_name: formData.tecName,
            tec_mob: formData.tecPhone,
            site_news: formData.news,
            gen_cm: formData.cm ? "y" : "n",
            gen_pm: formData.pm ? "y" : "n",
            gen_tt_wo: formData.wo ? "y" : "n"
        };
        console.log("update modal run")
        async function updateRecords() {
            try {
                const updateStatus = await updateSiteRecord(recordID, updatedData);
                if (updateStatus === true) {
                    toast.success("Record updated successfully");
                } else {
                    // Display error message in toast
                    toast.error(`Can't update, Permission denied`);
                    handleClose()
                }
            } catch (err) {
                console.error(err);
                // Fallback in case of an unexpected error
                toast.error("An unexpected error occurred.");
            }
        }

        updateRecords();
    }

    return (
        <div className="record-modal" onClick={handleClose}>
            <div className="record-modal-container" onClick={handleContainerClick}>
                <span className="material-symbols-outlined" onClick={handleClose}>close</span>
                <form>
                    <div className="modal-field">
                        <label htmlFor="siteID" className="modal-input-label">Site ID</label>
                        <input
                            type="text"
                            name="siteID"
                            value={formData.siteID}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="region" className="modal-input-label">Region</label>
                        <input
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="tecName" className="modal-input-label">Technician Names</label>
                        <input
                            type="text"
                            name="tecName"
                            value={formData.tecName}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="tecPhone" className="modal-input-label">Technician Phone</label>
                        <input
                            type="text"
                            name="tecPhone"
                            value={formData.tecPhone}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>
                    <div className="modal-field">
                        <label htmlFor="mdCapp" className="modal-input-label">Generator make</label>
                        <input
                            type="text"
                            name="mdCap"
                            value={formData.mdCap}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="news" className='modal-input-label'>News</label>
                        <textarea
                            name="news"
                            value={formData.news}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="modal-check-field">
                        <p className="modal-input-label">SAR</p>
                        <div className="modal-check-input">
                            <input
                                type="checkbox"
                                checked={formData.cm}
                                name="cm"
                                onChange={handleChange}
                            />
                            <label htmlFor="cm">CM</label>
                        </div>
                        <div className="modal-check-input">
                            <input
                                type="checkbox"
                                checked={formData.pm}
                                name="pm"
                                onChange={handleChange}
                            />
                            <label htmlFor="pm">PM</label>
                        </div>
                        <div className="modal-check-input">
                            <input
                                type="checkbox"
                                checked={formData.wo}
                                name="wo"
                                onChange={handleChange}
                            />
                            <label htmlFor="wo">WO</label>
                        </div>
                    </div>
                    <button className="modal-btn btn" onClick={handleUpdate} type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default RecordModal;
