import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { subscribeToSiteRecords } from '../../api';
import RecordModal from '../../components/RecordModal';


function Dashboard() {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [searchParams, setSearchPramas] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [modalItemId, setModalItemId] = useState(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = subscribeToSiteRecords((data) => {
            setRecords(data);
            setLoading(false);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    function toggleModal(id) {
        setModalItemId(id === modalItemId ? null : id);
    }


    if (modalItemId !== null) {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        // Enable scrolling when modal is closed
        document.body.style.overflow = 'auto';
    }

    function handleClose() {
        setModalItemId(null);
    }

    const typeFilter = searchParams.get("type");

    // Scrolling text for CM, PM, WO
    const cmText = records
        .filter(record => record.gen_cm === "y")
        .map(record => `${record.siteID}: ${record.site_news}`)
        .join(" | ");
    const pmText = records
        .filter(record => record.gen_pm === "y")
        .map(record => `${record.siteID}: ${record.site_news}`)
        .join(" | ");
    const woText = records
        .filter(record => record.gen_tt_wo === "y")
        .map(record => `${record.siteID}: ${record.site_news}`)
        .join(" | ");

    const cmCount = records.filter(record => record.gen_cm === 'y').length;
    const pmCount = records.filter(record => record.gen_pm === 'y').length;
    const woCount = records.filter(record => record.gen_tt_wo === 'y').length;

    Date.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
    }
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
    }
    var newDate = new Date();
    var datetime = newDate.today() + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0 " + newDate.timeNow();



    const handleSearchTerm = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term); // Only update the search term
    };

    const filteredRecords = records.filter((record) => {
        const matchesSearchTerm = searchTerm === "" ||
            record.siteID.toLowerCase().includes(searchTerm) ||
            record.region.toLowerCase().includes(searchTerm);
        const matchesTypeFilter = !typeFilter ||
            (typeFilter === "cm" && record.gen_cm === "y") ||
            (typeFilter === "pm" && record.gen_pm === "y") ||
            (typeFilter === "wo" && record.gen_tt_wo === "y");
        return matchesSearchTerm && matchesTypeFilter;
    });


    const recordsElements = filteredRecords.map(record => {
        return <div onClick={() => toggleModal(record.id)} className="record-container">
            <div className="records-row">
                <p className="record-id record-feild">{record.siteID}</p>
                <p className="location record-feild">{record.region}</p>
            </div>
            <div className="records-row">
                <p className="record-feild bold">{record.project}</p>
                <p className="record-feild">{record.gen_md_cap}</p>
            </div>
            <div className="records-row">
                <p className="record-feild">CM {record.gen_cm == "y" ? <span className="material-symbols-outlined" id='tick'>check</span> : ""}</p>
                <p className="record-feild">PM {record.gen_pm == "y" ? <span className="material-symbols-outlined" id='tick'>check</span> : ""}</p>
                <p className="record-feild">WO {record.gen_tt_wo == "y" ? <span className="material-symbols-outlined" id='tick'>check</span> : ""}</p>
            </div>
            <div className="records-row">
                <p className="record-feild">{record.tec_name}</p>
                <p className="record-feild bold">Mobile: <span>{record.tec_mob}</span></p>
            </div>
            <div className="records-row">
                <p className="record-feild bold">News: {record.site_news}</p>
            </div>
            {modalItemId == record.id &&
                <RecordModal record={record} handleClose={handleClose} />}
        </div>
    })

    if (loading) {
        return <h1 aria-live='polite'>Loading...</h1>
    }
    if (error) {
        return <h1 aria-live='assertive'>There was an error : {error.message}</h1>
    }

    return (
        <>
            <div className="home-container">
                <div className="bg-gradient wrapper">
                    <div className="welcome-container">
                        <div className="wrap mt-3">
                            <h1 className="text-3xl font-bold">Welcome!</h1>
                            <p className="datetime">{datetime}</p>
                        </div>
                        <div className="updates-container">
                            <h4 className='updates-label'>CMR : {cmCount}</h4>
                            <div id="scroll-container">
                                <div id="scroll-text" className='cm-color'>{cmText || "No updates found"}</div>
                            </div>
                        </div>
                        <div className="updates-container">
                            <h4 className='updates-label'>PMR : {pmCount}</h4>
                            <div id="scroll-container">
                                <div id="scroll-text" className='pm-color'>{pmText || "No updates found"}</div>
                            </div>
                        </div>
                        <div className="updates-container">
                            <h4 className='updates-label'>WO : {woCount}</h4>
                            <div id="scroll-container">
                                <div id="scroll-text" className='wo-color'>{woText || "No updates found"}</div>
                            </div>
                        </div>
                    </div>

                    <section className="records-section">
                        <div className="filter-options">
                            <div className="filters">
                                <button onClick={() => setSearchPramas({ type: "cm" })}
                                    className={`filter-btn cm ${typeFilter === "cm" && "selected"}`}>CM</button>
                                <button onClick={() => setSearchPramas({ type: "pm" })} className={`filter-btn pm ${typeFilter === "pm" && "selected"}`}>PM</button>
                                <button onClick={() => setSearchPramas({ type: "wo" })} className={`filter-btn wo ${typeFilter === "wo" && "selected"}`}>WO</button>
                                {typeFilter ?
                                    <button onClick={() => setSearchPramas({})} className="filter-btn clear-filter">Clear filter</button>
                                    : null
                                }
                            </div>
                            <div className="search">
                                <div className="search-field">
                                    <input type="text" name="search" placeholder='Search record...' onChange={handleSearchTerm} />
                                    <span className="material-symbols-outlined">search</span>

                                </div>
                            </div>
                        </div>

                        <div className="records-container">
                            {recordsElements}
                        </div>
                    </section>
                </div>




            </div>
        </>

    )
}

export default Dashboard