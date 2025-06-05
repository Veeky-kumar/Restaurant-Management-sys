import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LunchBreakModal from '../../components/RestaurantPanel/ManageProfile/LunchBreakModal';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RestaurantProfile {
    Id: 0,
    LoginId: 0
    TradingName: string;
    Description: string;
    Email: string;
    AlternateEmail: string;
    PhoneNumber_Only: string;
    Address: string;
    PostCode: string;
    Latitude: string | null;
    Longitude: string | null;
    IconImagePath: string | null;
    LanguageId: number | null;
    IconImage?: File | null;
}

interface TimingData {
    [key: string]: {
        closing: string[],
        checked: boolean,
        openingTime: string,
        closingTime: string,
        lunchToList: string[],
        lunchFrom: string,
        lunchTo: string,
        show: boolean
    };
}

declare global {
    interface Window {
        google: any;
    }
}

const ManageProfile: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('store_timing');
    const [openingTime, setOpeningTime] = useState<string[]>([]);
    const [addtionalTiming, setAdditionalTiming] = useState<string[]>([]);
    const [day, setDay] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [address, setAddress] = useState<string>('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [map, setMap] = useState<any>(null);
    const [newLogo, setNewLogo] = useState<File | null>(null);
    const [manual, setManual] = useState<boolean>(false)
    const [marker, setMarker] = useState<any | null>(null);
    const [profile, setProfile] = useState<RestaurantProfile>({
        Id: 0,
        LoginId: 0,
        TradingName: "",
        Description: "",
        Email: "",
        AlternateEmail: "",
        PhoneNumber_Only: "",
        Address: "",
        PostCode: "",
        Latitude: null,
        Longitude: null,
        IconImagePath: null,
        LanguageId: 1,
    });
    const restaurantLoginId = 0;

    const [timingData, setTimingData] = useState<TimingData>({
        Sunday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Monday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Tuesday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Wednesday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Thursday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Friday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
        Saturday: { closing: [], checked: false, openingTime: "", closingTime: "", lunchToList: [], lunchFrom: "", lunchTo: "", show: false },
    });

    const [additonaltiming, setAddtionalTiming] = useState({
        breakfastStartTime: "",
        breakfastEndTime: "",
        lunchStartTime: "",
        lunchEndTime: "",
        dinnerStartTime: "",
        dinnerEndTime: "",
    });

    const [errors, setErrors] = useState({
        breakfastStartTime: "",
        breakfastEndTime: "",
        lunchStartTime: "",
        lunchEndTime: "",
        dinnerStartTime: "",
        dinnerEndTime: "",
    });

    const getTimeData = async () => {
        const token = localStorage.getItem("authToken");
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/restaurant/timingdata?restaurantLoginId=${restaurantLoginId}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data = Array.isArray(response.data.data.restaurantTimingData) ? response.data.data.restaurantTimingData : response.data.data.restaurantTimingData || [];

            if (data.length > 0) {
                const updatedTimingData = { ...timingData };

                data.forEach((item: any) => {
                    const dayName = item.DayName;
                    updatedTimingData[dayName] = {
                        checked: item.IsOpened === 0,
                        openingTime: item.OpeningTime_12HoursFormat,
                        closingTime: item.ClosingTime_12HoursFormat,
                        closing: item.ClosingTimingList || [],
                        lunchToList: item.LunchBreakList?.map((lunch: any) => lunch.EndTime_12HoursFormat) || [],
                        lunchFrom: item.LunchBreakList?.[0]?.StartTime_12HoursFormat || "",
                        lunchTo: item.LunchBreakList?.[0]?.EndTime_12HoursFormat || "",
                        show: true,
                    };
                });
                setTimingData(updatedTimingData);
            } else {
                console.warn("No timing data found");
            }
        } catch (error) {
            console.error("Error fetching timing data:", error);
        }
    };

    const additionalTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddtionalTiming((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        let hasError = false;
        const newErrors = { ...errors };

        Object.keys(additonaltiming).forEach((key) => {
            if (!additonaltiming[key as keyof typeof additonaltiming]) {
                newErrors[key as keyof typeof errors] = "This field is required.";
                hasError = true;
            } else {
                newErrors[key as keyof typeof errors] = "";
            }
        });

        setErrors(newErrors);
        return !hasError;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        const token = localStorage.getItem("authToken");

        const _RestaurantLoginId = "0";

        // Prepare data object
        const formData = new FormData();
        formData.append("Id", "0");
        formData.append("breakfastStartTime", additonaltiming.breakfastStartTime);
        formData.append("breakfastEndTime", additonaltiming.breakfastEndTime);
        formData.append("lunchStartTime", additonaltiming.lunchStartTime);
        formData.append("lunchEndTime", additonaltiming.lunchEndTime);
        formData.append("dinnerStartTime", additonaltiming.dinnerStartTime);
        formData.append("dinnerEndTime", additonaltiming.dinnerEndTime);
        formData.append("restaurantLoginId", _RestaurantLoginId);
        formData.append("mode", "1");

        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/save/restaurantadditionaltiming`;

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.data.status === 1 && response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "warning",
                    text: response.data.message,
                    icon: "warning",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There is some technical error, please try again!");
        }
    };

    const languageOptions = [
        { value: 1, label: 'Chinese' },
        { value: 2, label: 'English' },
        { value: 3, label: 'Korean' },
        { value: 4, label: 'Punjabi' },
    ];

    const OpenTimeChange = async (day: string, openingTime: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Authentication token not found.");
                return;
            }

            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/closingtiminglist`;

            const response = await axios.post(
                apiUrl,
                { openTime: openingTime },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 && response.data.status === 1) {
                // Ensure the returned data matches the expected structure
                setTimingData((prev) => ({
                    ...prev,
                    [day]: {
                        ...prev[day],
                        openingTime: openingTime,
                        closing: response.data.data.timingList,
                        closingTime: "",
                        checked: prev[day].checked,
                    },
                }));
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching closing timings:", error);
        }
    }

    const handleDayStatus = (day: string) => {
        setTimingData((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                checked: !prev[day].checked,
            },
        }));
    };

    //get opening lunch timing
    const getOpeningTiming = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/openingtiminglist`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                setOpeningTime(response.data.data.timingList);
            }
        } catch (error) {
            console.error("Error fetching opening timings:", error);
        }
    };

    const getAddtionalTiming = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/restaurant/timinglistdata`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200 && response.data.status === 1) {
                setAdditionalTiming(response.data.data.timingList);
            }
        }
        catch (error) {

        }
    }

    const SetLunchBreak_RestaurantTiming = (day: string) => {

        setDay(day);
        if (timingData[day].openingTime === "") {
            Swal.fire({
                title: "Warning!",
                text: "Opening time is not set for the selected day.",
                icon: "warning",
            });
            return;
        }
        else if (timingData[day].closingTime === "") {
            Swal.fire({
                title: "Warning!",
                text: "closing time is not set for the selected day.",
                icon: "warning",
            });
            return;
        }

        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    const handleClosingTimeChange = (day: string, closingTime: string) => {
        setTimingData((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                closingTime: closingTime,
            },
        }));
    };

    const SaveRestaurantTiming = async () => {
        try {
            setLoading(true);
            const payload = new FormData();
            Object.keys(timingData).forEach((day) => {
                const dayData = timingData[day];
                const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

                payload.append(`${day}OpeningTime`, dayData.openingTime || "");
                payload.append(`${day}ClosingTime`, dayData.closingTime || "");
                payload.append(`${day}LunchStartTime`, dayData.lunchFrom || "");
                payload.append(`${day}LunchEndTime`, dayData.lunchTo || "");
                payload.append(`isOpen${dayCapitalized}`, dayData.checked ? "0" : "1");
            });

            payload.append("restaurantLoginId", profile.LoginId);
            payload.append("Id", profile.Id);
            payload.append("mode", "1");

            const token = localStorage.getItem("authToken");
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/save/restauranttiming`;

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const { data } = response;
                if (data.status === 1 || data.status === 2) {
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                } else {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {

                if (error.response) {

                    if (error.response.status === 401) {
                        toast.error('Unauthorized! Invalid Token!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                    } else {

                        toast.error('There is some technical error, please try again!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                    }
                }
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                const apiUrl = `${import.meta.env.VITE_API_URL}/api/get/restaurant/profile?restaurantLoginId=${restaurantLoginId}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200 && response.data.status === 1) {

                    setProfile(response.data.data.restaurantDetail);

                    if (response.data.data.restaurantDetail.Latitude && response.data.data.restaurantDetail.Longitude) {
                        setLatitude(parseFloat(response.data.data.restaurantDetail.Latitude));
                        setLongitude(parseFloat(response.data.data.restaurantDetail.Longitude));
                        setAddress(response.data.data.restaurantDetail.Address);
                    }

                } else {
                    setError("Failed to load profile.");
                }
            } catch (err) {
                setError("An error occurred while fetching the profile.");
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        getTimeData();
        fetchProfile();
        getOpeningTiming();
        getAddtionalTiming();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: name === 'languageId' ? Number(value) : value,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewLogo(e.target.files[0]);
        }
    };

    const initMap = () => {
        if (latitude && longitude) {
            const mapElement = document.getElementById("map")!;
            const mapInstance = new window.google.maps.Map(mapElement, {
                center: { lat: latitude, lng: longitude },
                zoom: 18,
            });

            // const marker = new window.google.maps.Marker({
            //     position: { lat: latitude, lng: longitude },
            //     map: mapInstance,
            //     title: "Restaurant Location",
            // });

            setMap(mapInstance);
        }
    };

    const initAutocomplete = () => {
        const input = document.getElementById("autocomplete");
        if (!input) return;

        const autocomplete = new window.google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: "nz" },
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLatitude(lat);
            setLongitude(lng);
            setAddress(place.formatted_address);

            // Set marker on map
            if (marker) marker.setMap(null);

            const newMarker = new window.google.maps.Marker({
                position: { lat, lng },
                map,
                draggable: true,
            });

            setMarker(newMarker);
            map.setCenter({ lat, lng });

            // Add dragend listener to update coordinates and address
            newMarker.addListener("dragend", () => {
                const newLat = newMarker.getPosition().lat();
                const newLng = newMarker.getPosition().lng();

                setLatitude(newLat);
                setLongitude(newLng);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        setAddress(results[0].formatted_address);
                    }
                });
            });
        });
    };

    useEffect(() => {
        if (window.google && window.google.maps) {
            initMap();
            initAutocomplete();
        } else {
            const script = document.createElement("script");
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&callback=initMap`;
            script.defer = true;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                initMap();
                initAutocomplete();
            };
        }
    }, [latitude, longitude]);

    const handleLocationChange = (event) => {
        const locationType = event.target.value;


        if (locationType === "CurrentLocation") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        setManual(false);
                        setLatitude(lat);
                        setLongitude(lng);
                        setAddress("Current Location");
                    },
                    (error) => console.error("Error getting location:", error)
                );
            }
        } else if (locationType === "Manual") {
            setManual(true);
            setLatitude(null);
            setLongitude(null);
            setAddress("");
        } else {
            setManual(false);
            setLatitude(null);
            setLongitude(null);
            setAddress("");
        }
    };


    // update profile function 
    const btnUpdateRestaurantInfo_ManageProfile = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const token = localStorage.getItem("authToken");
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/update/restaurant/information`;

        const formData = new FormData();
        formData.append("Id", String(profile.Id));
        formData.append("restaurantLoginId", String(profile.LoginId));
        formData.append("restaurantName", profile.TradingName);
        formData.append("restaurantDescription", profile.Description);
        formData.append("email", profile.Email);
        formData.append("phoneNumberOnly", profile.PhoneNumber_Only);
        formData.append("address", profile.Address);

        if (newLogo) {
            formData.append("iconImage", newLogo);
        }

        try {
            setLoading(true);
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 && (response.data.status === 1 || response.data.status === 2)) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (err) {
            if (axios.isAxiosError(error)) {

                if (error.response) {

                    if (error.response.status === 401) {
                        toast.error('Unauthorized! Invalid Token!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                    } else {

                        toast.error('There is some technical error, please try again!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                    }
                }
            }
        }
        finally {
            setLoading(false);
        }
    };

    // update restaurantInfo 
    const UpdateRestaurantAddressInformation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userToken = localStorage.getItem("authToken");
        const restaurantLoginId = profile.LoginId;

        const data = new FormData();
        data.append("restaurantLoginId", String(restaurantLoginId));
        data.append("address", profile.Address);
        data.append("LanguageId", String(profile.LanguageId));
        data.append("latitude", String(latitude || 0));
        data.append("longitude", String(longitude || 0));
        data.append("address_GoogleAutoComplete", "");

        if (newLogo) {
            data.append("iconImage", newLogo);
        }

        if (!address || address.trim() === "" || !profile.LanguageId || profile.LanguageId === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'Please fill in all required fields and select a valid location.',
            });
            return;
        }

        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/update/restaurant/address/info`;
            const response = await axios.post(apiUrl, data, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 && response.data.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Address Updated Successfully',
                    text: response.data.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: response.data.message || 'There was an error updating the address.',
                });
            }
        } catch (error) {
            console.error('Error updating restaurant address:', error);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'There was a problem connecting to the server.',
            });
        }
    };

    // if (loading) {
    //     return <div style={{
    //         backgroundColor: "#9af58c",
    //         position: "fixed",
    //         top: "0",
    //         left: "0",
    //         width: "100%",
    //         height: "300%",
    //         zIndex: 999999999999999,
    //         MozOpacity: 0.2,
    //         opacity: 0.2,
    //     }}>
    //         <img src="/Content/Images/Loader.gif" style={{
    //             // backgroundColor: "#9af58c",
    //             alignItems: "center",
    //             position: "fixed",
    //             top: "40%",
    //             width: "10%",
    //             left: "15%",
    //         }} />
    //     </div>;
    // }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className='p-body'>
            {loading && (<div style={{
                backgroundColor: "#f0f5f0",
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "300%",
                zIndex: 999999999999999,
                MozOpacity: 0.2,
                opacity: 0.2,
            }}>
                <img src="/Content/Images/Loader.gif" style={{
                    backgroundColor: "#9af58c",
                    alignItems: "center",
                    position: "fixed",
                    top: "40%",
                    width: "10%",
                    left: "50%",
                }} />
            </div>)}
            <div id="contentWrapper_RestaurantLayout" className="content-wrapper timing_stores">
                <div className="breadcrumb-scroll">
                    <div className="breadcrumn-height">
                        <div>
                            <div className="profile">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <h6>Restaurant Info</h6>
                                            <div className="b-color border border-1">
                                                <div className="row px-2">
                                                    <div className="col text-right pr-3"></div>
                                                    <div className="pad-add">
                                                        <form>
                                                            <div className="form-row align- -center">
                                                                <div className="form-group col-md-6 mb-0">
                                                                    <div className="logo-detail">
                                                                        <h5>Logo</h5>
                                                                        <div className="mylogo">
                                                                            <div className="imageWrapper">
                                                                                <img
                                                                                    className="image"
                                                                                    id="imgIconImage_RestaurantManageProfile"
                                                                                    src={profile.IconImagePath || './Content/ImageUploads/WebMenu/darkcake2_d0a43ec52b8246c8b5d9d1dce8cdce91.png'}
                                                                                    onChange={handleLogoChange}
                                                                                    alt="Logo"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group col-md-6 mb-1">
                                                                    <label htmlFor="inputName3">
                                                                        Trading Name <span className="requiredFieldClass">*</span>
                                                                    </label>
                                                                    <input
                                                                        id="RestaurantName_ManageProfile"
                                                                        type="text"
                                                                        name="TradingName"
                                                                        className="form-control"
                                                                        value={profile.TradingName}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div id="error_RestaurantName_ManageProfile" className="errorsClass2"></div>
                                                                    <label htmlFor="inputDescription3" className="mt-2">
                                                                        Description <span className="requiredFieldClass">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="Description"
                                                                        id="RestaurantDescription_ManageProfile"
                                                                        value={profile.Description}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div id="error_RestaurantDescription_ManageProfile" className="errorsClass2"></div>
                                                                </div>
                                                            </div>

                                                            <div className="form-row mt-3">
                                                                <div className="form-group col-md-4 mb-1">
                                                                    <label htmlFor="Email_ManageProfile">Restaurant Email</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="Email"
                                                                        id="Email_ManageProfile"
                                                                        value={profile.Email}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-4 mb-1">
                                                                    <label htmlFor="inputEmail3">
                                                                        Alternate Email <span className="requiredFieldClass">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="AlternateEmail"
                                                                        id="RestaurantEmail_ManageProfile"
                                                                        value={profile.AlternateEmail}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div id="error_RestaurantEmail_ManageProfile" className="errorsClass2"></div>
                                                                </div>
                                                                <div className="form-group col-md-4 mb-1">
                                                                    <label htmlFor="inputPhone3">
                                                                        Contact Phone <span className="requiredFieldClass">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="PhoneNumber_Only"
                                                                        id="RestaurantPhoneNumber_ManageProfile"
                                                                        value={profile.PhoneNumber_Only}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div id="error_RestaurantPhoneNumber_ManageProfile" className="errorsClass2"></div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div id="btnUpdateRestaurantInfo_ManageProfile" className="row text-right" style={{ marginTop: "20px" }}>
                                                            <div className="grid grid-cols-2 sm:grid-cols-1 sm:flex gap-1 col-12">
                                                                <a href="#">
                                                                    <button type="button" className="btm_button_pro"
                                                                        onClick={(e) => btnUpdateRestaurantInfo_ManageProfile(e)}
                                                                    >
                                                                        SAVE
                                                                    </button>
                                                                </a>
                                                                <a href="#">
                                                                    <button type="button" className="btm_button_pro"
                                                                    // onClick={() => btnCancelRestaurantInfo_ManageProfile()}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper-navs_wraps">
                                <div className="container-fluid">
                                    <div className="row">
                                        <h6 className="trading px-0">Trading hours</h6>
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-white bxshadow px-0">

                                            <input type="hidden" id="hdn_RLID_SoftwareSettingRestaurant" value="0" />
                                            <ul className="nav nav-tabs software_settings" role="tablist">
                                                {/* <!-- <li class="nav-item">
                                                            <a class="nav-link active" data-toggle="tab" href="#online_order"
                                                                onclick="ShowRestaurantTiming_DefaultTab_SoftwareSetting();">Store Timings</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link px-0" data-toggle="tab" href="#breakfast_lunch_dinner"
                                                                onclick="RestaurantTables_SoftwareSetting();">Breakfast ,lunch, dinner-timings</a>
                                                        </li> --> */}
                                            </ul>
                                            <div className="tab-content">
                                                <div id="online_order" className="container-fluid px-0 tab-pane active">
                                                    <div className="timing-cgt-desc store_information-wraps">
                                                        <div className="cgt-desc store_timimgs-wraps">
                                                            <div className="tabs_wraps-div">
                                                                <ul className="grid grid-rows-[auto] md:grid-cols-2 tabs online_store_timing clearfix">
                                                                    <li className="col-span-1 " style={{width:"100%"}}>
                                                                        <a
                                                                            id="tab_StoreTiming_SoftwareSetting"

                                                                            className={`nav-link ${activeTab === 'store_timing' ? 'active' : ''}`}
                                                                            data-toggle="tab"
                                                                            onClick={() => setActiveTab('store_timing')}
                                                                        // onClick={() => OpenStoreTiming_Tab_SoftwareSetting()}
                                                                        >
                                                                            STORE TIMINGS
                                                                        </a>
                                                                    </li>
                                                                    <li className="col-span-1 " style={{width:"100%"}}>
                                                                        <a

                                                                            className={`nav-link ${activeTab === 'breakfast_lunch_dinner' ? 'active' : ''}`}
                                                                            // onClick={() => RestaurantAdditionalTiming_SoftwareSetting()}
                                                                            onClick={() => setActiveTab('breakfast_lunch_dinner')}
                                                                        >
                                                                            BREAKFAST, LUNCH AND DINNER TIMING
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                            </div>
                                                            <div className="cgt-content">
                                                                <div id="store_timing" className={`p-0 tab ${activeTab === 'store_timing' ? '' : ''}`} style={{ display: activeTab === 'store_timing' ? 'block' : 'none' }}>
                                                                    <h4>Store Timings</h4>
                                                                    <div className="restaurant_wraps-timings">
                                                                        <div className="items_chckbox-wraps">
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2 ">
                                                                                            <p className="day_wise mg-bottom-0">Sunday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Sunday")}
                                                                                                        checked={!timingData["Sunday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Sunday"].checked ? "Open" : "Close"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Sunday"].checked && (
                                                                                        <div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                            <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                                <div className="md:col-span-1 hidden lg:block"></div>
                                                                                                <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Sunday", e.target.value)}
                                                                                                    value={timingData.Sunday.openingTime}
                                                                                                >
                                                                                                    <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                                <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span> to </span>
                                                                                            </p>
                                                                                                <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Sunday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange("Sunday", e.target.value)}
                                                                                                >
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Sunday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                                <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a
                                                                                                            onClick={() => SetLunchBreak_RestaurantTiming("Sunday")}
                                                                                                        >
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Sunday.show
                                                                                                                    ? ` ${timingData.Sunday.lunchFrom} to ${timingData.Sunday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2">
                                                                                            <p className="day_wise mg-bottom-0">Monday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Monday")}
                                                                                                        checked={!timingData["Monday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Monday"].checked ? "Open" : "Close"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Monday"].checked && (<div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                        <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                        <div className="md:col-span-1 hidden lg:block"></div>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Monday", e.target.value)}
                                                                                                    value={timingData.Monday.openingTime}
                                                                                                >  <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span>to</span>
                                                                                            </p>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Monday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange("Monday", e.target.value)}>
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Monday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a onClick={() => SetLunchBreak_RestaurantTiming("Monday")}>
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Monday.show
                                                                                                                    ? ` ${timingData.Monday.lunchFrom} to ${timingData.Monday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2">
                                                                                            <p className="day_wise mg-bottom-0">Tuesday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Tuesday")}
                                                                                                        checked={!timingData["Tuesday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Tuesday"].checked ? "Open" : "Close"} 
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {!timingData["Tuesday"].checked && (
                                                                                        <div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                            <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                            <div className="md:col-span-1 hidden lg:block"></div>
                                                                                                <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                    <select
                                                                                                        id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                        className="form-control OpeningTimeCommonClass"
                                                                                                        onChange={(e) => OpenTimeChange("Tuesday", e.target.value)}
                                                                                                        value={timingData.Tuesday.openingTime}
                                                                                                    >  <option value="0">Select</option>
                                                                                                        {openingTime.map((timing, index) => (
                                                                                                            <option key={index} value={timing}>
                                                                                                                {timing}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </select>
                                                                                                </div>
                                                                                                <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                    <span> to </span>
                                                                                                </p>
                                                                                                <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                    <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                        value={timingData.Tuesday.closingTime}
                                                                                                        className="form-control ClosingTimeCommonClass"
                                                                                                        onChange={(e) => handleClosingTimeChange('Tuesday', e.target.value)}
                                                                                                    >
                                                                                                        <option value="0">Select</option>
                                                                                                        {timingData["Tuesday"].closing.map((time, index) => (
                                                                                                            <option key={index} value={time}>
                                                                                                                {time}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </select>
                                                                                                </div>
                                                                                                <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                    <h2 className="heading_wraps">
                                                                                                        <span className="cart_wrap-cion">
                                                                                                            <a
                                                                                                                onClick={() => SetLunchBreak_RestaurantTiming("Tuesday")}
                                                                                                            >
                                                                                                                Lunch Break
                                                                                                                <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                    {timingData.Tuesday.show
                                                                                                                        ? ` ${timingData.Tuesday.lunchFrom} to ${timingData.Tuesday.lunchTo}`
                                                                                                                        : ""}
                                                                                                                </div>
                                                                                                            </a>
                                                                                                        </span>
                                                                                                    </h2>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="row">
                                                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                    <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps ">
                                                                                            <p className="day_wise mg-bottom-0 mr-3">Wednesday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Wednesday")}
                                                                                                        checked={!timingData["Wednesday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Wednesday"].checked ? "Open" : "Close"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Wednesday"].checked && (<div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                        <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                        <div className="md:col-span-1 hidden lg:block"></div>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Wednesday", e.target.value)}
                                                                                                    value={timingData.Wednesday.openingTime}

                                                                                                >  <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span> to </span>
                                                                                            </p>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Wednesday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange('Wednesday', e.target.value)}
                                                                                                >
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Wednesday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}

                                                                                                </select>
                                                                                            </div>
                                                                                            <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a
                                                                                                            onClick={() => SetLunchBreak_RestaurantTiming("Wednesday")}
                                                                                                        >
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Wednesday.show
                                                                                                                    ? ` ${timingData.Wednesday.lunchFrom} to ${timingData.Wednesday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2">
                                                                                            <p className="day_wise mg-bottom-0">Thursday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Thursday")}
                                                                                                        checked={!timingData["Thursday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Thursday"].checked ? "Open" : "Close"} 
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Thursday"].checked && (<div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                        <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                        <div className="md:col-span-1 hidden lg:block"></div>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Thursday", e.target.value)}
                                                                                                    value={timingData.Thursday.openingTime}
                                                                                                >  <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span> to </span>
                                                                                            </p>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Thursday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange('Thursday', e.target.value)}>
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Thursday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a
                                                                                                            onClick={() => SetLunchBreak_RestaurantTiming("Thursday")}
                                                                                                        >
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Thursday.show
                                                                                                                    ? ` ${timingData.Thursday.lunchFrom} to ${timingData.Thursday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2">
                                                                                            <p className="day_wise mg-bottom-0">Friday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Friday")}
                                                                                                        checked={!timingData["Friday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Friday"].checked ? "Open" : "Close"} 
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Friday"].checked && (<div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                        <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                        <div className="md:col-span-1 hidden lg:block"></div>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Friday", e.target.value)}
                                                                                                    value={timingData.Friday.openingTime}
                                                                                                >
                                                                                                    <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span> to </span>
                                                                                            </p>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Friday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange('Friday', e.target.value)}>
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Friday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a
                                                                                                            onClick={() => SetLunchBreak_RestaurantTiming("Friday")}
                                                                                                        >
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Friday.show
                                                                                                                    ? ` ${timingData.Thursday.lunchFrom} to ${timingData.Thursday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 col-lg-12 col-sm-12 weekly_restrutant-breaks">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col-lg-12 col-sm-5" style={{ display: 'flex' }}>
                                                                                        <div className="day_wraps gap-2">
                                                                                            <p className="day_wise mg-bottom-0">Saturday</p>
                                                                                            <span className="restaurant_wraps-open-close">
                                                                                                <label className="switch round_wraps">
                                                                                                    <input
                                                                                                        id="chkSunday_RestaurantTiming_SoftwareSetting"
                                                                                                        type="checkbox"
                                                                                                        onChange={() => handleDayStatus("Saturday")}
                                                                                                        checked={!timingData["Saturday"].checked}
                                                                                                    />
                                                                                                    <span className="slider round"></span>
                                                                                                </label>
                                                                                            </span>
                                                                                            <span id="lblOpenCloseStatus_Sunday_RestaurantTiming_SoftwareSetting" className="weekly_name">
                                                                                                {!timingData["Saturday"].checked ? "Open" : "Close"} 
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {!timingData["Saturday"].checked && (<div id="dv_TimingSection_Sunday_RestaurantTiming_SoftwareSetting" className="col-md-7 md:pl-5 col-lg-12 col-sm-7" style={{ padding: '0px' }}>
                                                                                        <div className="restruuent_timings-frm-to grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0">
                                                                                        <div className="md:col-span-1 hidden lg:block"></div>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select
                                                                                                    id="ddlOpeningTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    className="form-control OpeningTimeCommonClass"
                                                                                                    onChange={(e) => OpenTimeChange("Saturday", e.target.value)}
                                                                                                    value={timingData.Saturday.openingTime}
                                                                                                >
                                                                                                    <option value="0">Select</option>
                                                                                                    {openingTime.map((timing, index) => (
                                                                                                        <option key={index} value={timing}>
                                                                                                            {timing}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <p className="from_time px-2 sm:col-span-1 flex justify-center !w-full sm:w-auto">
                                                                                                <span> to </span>
                                                                                            </p>
                                                                                            <div className="select_box timing_etc-wraps sm:col-span-2 !w-full sm:w-auto">
                                                                                                <select id="ddlClosingTime_Sunday_RestaurantTiming_SoftwareSetting"
                                                                                                    value={timingData.Saturday.closingTime}
                                                                                                    className="form-control ClosingTimeCommonClass"
                                                                                                    onChange={(e) => handleClosingTimeChange('Saturday', e.target.value)}>
                                                                                                    <option value="0">Select</option>
                                                                                                    {timingData["Saturday"].closing.map((time, index) => (
                                                                                                        <option key={index} value={time}>
                                                                                                            {time}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>
                                                                                            </div>
                                                                                            <div className="mini_carts justify-center md:col-span-3 lg:col-span-2 pl-0">
                                                                                                <h2 className="heading_wraps">
                                                                                                    <span className="cart_wrap-cion">
                                                                                                        <a
                                                                                                            onClick={() => SetLunchBreak_RestaurantTiming("Saturday")}
                                                                                                        >
                                                                                                            Lunch Break
                                                                                                            <div id="lblLunchBreak_Sunday_RestaurantTiming_SoftwareSetting" style={{ color: 'red' }}>
                                                                                                                {timingData.Saturday.show
                                                                                                                    ? ` ${timingData.Saturday.lunchFrom} to ${timingData.Saturday.lunchTo}`
                                                                                                                    : ""}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </span>
                                                                                                </h2>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                                                <div id="sunday_error_RestaurantTiming_SoftwareSetting" className="errorsClass2 errClassRestaurantTiming_SoftwareSetting"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>

                                                                            <div className="row custom_add_pro_rpw button_botm" style={{ paddingTop: '30px' }}>
                                                                                <div className="col-sm-12">

                                                                                    <button className="btm_button_pro" onClick={SaveRestaurantTiming}>
                                                                                        SAVE
                                                                                    </button>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="breakfast_lunch_dinner" className={`p-0 tab ${activeTab === 'breakfast_lunch_dinner' ? '' : ''}`} style={{ display: activeTab === 'breakfast_lunch_dinner' ? 'block' : 'none' }}>
                                                                    <h4>Breakfast, lunch and dinner timing</h4>
                                                                    <div className="items_chckbox-wraps wrap_delay-items w-auto ">
                                                                        {/* Breakfast Time */}
                                                                        <div className="order_delay-wraps grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0" style={{ marginBottom: "0px" }}>
                                                                            <div className='sm:col-span-1'></div>
                                                                            <p>Breakfast From</p>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="breakfastStartTime"
                                                                                    value={additonaltiming.breakfastStartTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.breakfastEndTime && <div className="error text-red-700 text-md font-bold">{errors.breakfastEndTime}</div>}
                                                                            <p className="to_wraps">to</p>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="breakfastEndTime"
                                                                                    value={additonaltiming.breakfastEndTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"

                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.breakfastStartTime && <span className="error text-red-700 font-bold">{errors.breakfastStartTime}</span>}
                                                                        </div>

                                                                        {/* Lunch Time */}
                                                                        <div className="order_delay-wraps  grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0" style={{ marginBottom: "0px", marginTop: "30px" }}>
                                                                            <p>Lunch From</p>
                                                                            <div className='sm:col-span-1'></div>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="lunchStartTime"
                                                                                    value={additonaltiming.lunchStartTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.lunchStartTime && <div className="error text-red-700 text-md font-bold">{errors.lunchStartTime}</div>}
                                                                            <p className="to_wraps">to</p>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="lunchEndTime"
                                                                                    value={additonaltiming.lunchEndTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.lunchEndTime && <div className="error text-red-700 text-md font-bold">{errors.lunchEndTime}</div>}
                                                                        </div>

                                                                        {/* Dinner Time */}
                                                                        <div className="order_delay-wraps  grid grid-rows-[auto] sm:grid-cols-[repeat(8,1fr)] sm:gap-0" style={{ marginBottom: "0px", marginTop: "30px" }}>
                                                                            <p>Dinner From</p>
                                                                            <div className='sm:col-span-1'></div>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="dinnerStartTime"
                                                                                    value={additonaltiming.dinnerStartTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.dinnerEndTime && <div className="error text-red-700 text-md font-bold">{errors.dinnerEndTime}</div>}
                                                                            <p className="to_wraps">to</p>
                                                                            <div className="select_box delay_order-select sm:col-span-2 !w-full sm:w-auto">
                                                                                <select
                                                                                    name="dinnerEndTime"
                                                                                    value={additonaltiming.dinnerEndTime}
                                                                                    onChange={additionalTimeChange}
                                                                                    className="form-control CommonRestaurantAdditionalTimingClass_SoftwareSetting"
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {addtionalTiming.map((time, index) => (
                                                                                        <option key={index} value={time}>{time}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            {errors.dinnerStartTime && <div className="error text-red-700 text-md font-bold">{errors.dinnerStartTime}</div>}
                                                                        </div>
                                                                    </div>

                                                                    <div className="row custom_add_pro_rpw button_botm" style={{ paddingTop: "30px" }}>
                                                                        <div className="col-sm-12">
                                                                            <button className="btm_button_pro" onClick={handleSave} >
                                                                                SAVE
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="address px-0">
                                            <div style={{ position: 'relative' }}>
                                                <div className="container-fluid">
                                                    <div className="row">

                                                        <div className="col-12 px-0">
                                                            <div className="row">
                                                                <h6 className="col-6 px-3">Address</h6>
                                                                <div className="col-6 text-end">
                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            className="form-check-input rdbLocationStyle"
                                                                            type="radio"
                                                                            name="rdbLocationPickOption"
                                                                            id="clCheck"
                                                                            value="CurrentLocation"
                                                                            onClick={handleLocationChange}
                                                                        />
                                                                        <label className="form-check-label lblLocationPickStyle" htmlFor="clCheck">
                                                                            Current Location<i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            className="form-check-input rdbLocationStyle"
                                                                            type="radio"
                                                                            name="rdbLocationPickOption"
                                                                            id="manualCheck"
                                                                            value="Manual"
                                                                            onClick={handleLocationChange}
                                                                        />
                                                                        <label className="form-check-label lblLocationPickStyle" htmlFor="manualCheck">
                                                                            Manual<i className="input-helper"></i>
                                                                        </label>
                                                                    </div>
                                                                    <br />
                                                                    {manual && (<div style={{ display: 'inline-block' }}>
                                                                        <input
                                                                            id="autocomplete"
                                                                            type="text"
                                                                            placeholder="Enter Location"
                                                                            className="form-control pac-target-input"
                                                                            autoComplete="off"
                                                                        />
                                                                    </div>)}
                                                                </div>
                                                            </div>
                                                            <div className="b-color">
                                                                <div id="map" style={{ height: "400px", width: "100%" }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="language-section mx-0">
                                                    <div className="container-fluid px-0">
                                                        <div className="row px-0 select-icon">
                                                            <div className="col-12">
                                                                <form onSubmit={UpdateRestaurantAddressInformation}>
                                                                    <div className="row">
                                                                        {/* Language Selection */}
                                                                        <div className="col-md-3">
                                                                            <div className="form-group">
                                                                                <label htmlFor="ddlLanuage_ManageProfile">
                                                                                    Language <span className="requiredFieldClass">*</span>
                                                                                </label>
                                                                                <div className="select_box">
                                                                                    <select
                                                                                        className="form-control select-bx py-1"
                                                                                        id="ddlLanuage_ManageProfile"
                                                                                        name="LanguageId"
                                                                                        placeholder="Select Language"
                                                                                        value={profile.LanguageId}
                                                                                        onChange={handleChange}
                                                                                    >
                                                                                        <option value="0">Select</option>
                                                                                        {languageOptions.map((option) => (
                                                                                            <option key={option.value} value={option.value}>
                                                                                                {option.label}
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Address Field */}
                                                                        <div className="col-md-3">
                                                                            <div className="form-group mb-0">
                                                                                <label htmlFor="txtAddress_ManageProfile">
                                                                                    Address <span className="requiredFieldClass">*</span>
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="txtAddress_ManageProfile"
                                                                                    name="Address"
                                                                                    placeholder="Enter Address"
                                                                                    value={profile.Address}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* Longitude */}
                                                                        <div className="col-md-3">
                                                                            <h6 className="mt-3 mb-0 text-center">
                                                                                <span style={{ fontWeight: 550, fontSize: '17px' }}>
                                                                                    Longitude <span className="requiredFieldClass">*</span>:{' '}
                                                                                </span>
                                                                                <a href="javascript:;" id="txtLongitude_ManageProfile">
                                                                                    {latitude || 0}
                                                                                </a>
                                                                            </h6>
                                                                        </div>

                                                                        {/* Latitude */}
                                                                        <div className="col-md-3">
                                                                            <h6 className="mt-3 mb-0">
                                                                                <span style={{ fontWeight: 550, fontSize: '17px' }}>
                                                                                    Latitude <span className="requiredFieldClass">*</span>:{' '}
                                                                                </span>
                                                                                <a href="javascript:;" id="txtLatitude_ManageProfile">
                                                                                    {longitude || 0}
                                                                                </a>
                                                                            </h6>
                                                                        </div>
                                                                    </div>

                                                                    {/* Save Button inside form */}
                                                                    <div className="row text-right">
                                                                        <div className="col-12">
                                                                            <button type="submit" className="btm_button_pro">
                                                                                SAVE
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LunchBreakModal
                buttonRef={buttonRef}
                openingTime={openingTime}
                timingData={timingData}
                setTimingData={setTimingData}
                day={day}
            />
            <ToastContainer />
        </div>
    )
}

export default ManageProfile
