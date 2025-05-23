import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  UK: ["London", "Manchester", "Liverpool"],
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  // Track touched fields for better UX (show errors only after touched)
  const [touched, setTouched] = useState({});

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation logic
  useEffect(() => {
    const newErrors = {};

    // Trimmed values
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const username = formData.username.trim();
    const email = formData.email.trim();
    const pan = formData.pan.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const aadhar = formData.aadhar.trim();

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!username) newErrors.username = "Username is required.";

    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email format is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number & special char.";

    // Phone validation based on country code
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else {
      if (formData.phoneCode === "+91" && !/^\d{10}$/.test(phoneNumber))
        newErrors.phoneNumber =
          "Indian phone number must be exactly 10 digits.";
      else if (formData.phoneCode === "+1" && !/^\d{10}$/.test(phoneNumber))
        newErrors.phoneNumber = "USA phone number must be exactly 10 digits.";
      else if (formData.phoneCode === "+44" && !/^\d{10}$/.test(phoneNumber))
        newErrors.phoneNumber =
          "UK phone number must be exactly 10 digits (no leading zero).";
    }

    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.city) newErrors.city = "City is required.";

    // PAN validation: Typically 10 chars, format: 5 letters, 4 digits, 1 letter
    if (!pan) {
      newErrors.pan = "PAN number is required.";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
      newErrors.pan = "PAN format is invalid (e.g. ABCDE1234F).";
    }

    // Aadhar validation: exactly 12 digits
    if (!aadhar) newErrors.aadhar = "Aadhar number is required.";
    else if (!/^\d{12}$/.test(aadhar))
      newErrors.aadhar = "Aadhar must be exactly 12 digits.";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit input lengths & allow only digits for phone and aadhar
    if (name === "phoneNumber") {
      if (value === "" || /^[0-9]{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    if (name === "aadhar") {
      if (value === "" || /^[0-9]{0,12}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    if (name === "pan") {
      // allow alphanumeric uppercase only, max length 10
      if (value === "" || /^[A-Za-z0-9]{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // On country change reset city
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({ ...prev, country, city: "" }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Pass trimmed data to success page
      const trimmedData = {};
      Object.keys(formData).forEach((key) => {
        trimmedData[key] =
          typeof formData[key] === "string"
            ? formData[key].trim()
            : formData[key];
      });
      navigate("/success", { state: trimmedData });
    } else {
      // Mark all as touched to show errors if user tries submit early
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
    }
  };

  return (
    <div className="form-wrapper" role="main">
      <form onSubmit={handleSubmit} className="form-container" noValidate>
        <h2>Registration Form</h2>

        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">
            First Name<span aria-hidden="true">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby="firstName-error"
          />
          {touched.firstName && errors.firstName && (
            <span className="error" id="firstName-error" role="alert">
              {errors.firstName}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">
            Last Name<span aria-hidden="true">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby="lastName-error"
          />
          {touched.lastName && errors.lastName && (
            <span className="error" id="lastName-error" role="alert">
              {errors.lastName}
            </span>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">
            Username<span aria-hidden="true">*</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby="username-error"
          />
          {touched.username && errors.username && (
            <span className="error" id="username-error" role="alert">
              {errors.username}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email<span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {touched.email && errors.email && (
            <span className="error" id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">
            Password<span aria-hidden="true">*</span>
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
            autoComplete="new-password"
          />
          <label className="show-password-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />{" "}
            Show Password
          </label>
          {touched.password && errors.password && (
            <span className="error" id="password-error" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">
            Phone No.<span aria-hidden="true">*</span>
          </label>
          <div className="phone-input">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              aria-label="Country code"
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={errors.phoneNumber ? "true" : "false"}
              aria-describedby="phoneNumber-error"
              maxLength="10"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {touched.phoneNumber && errors.phoneNumber && (
            <span className="error" id="phoneNumber-error" role="alert">
              {errors.phoneNumber}
            </span>
          )}
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="country">
            Country<span aria-hidden="true">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.country ? "true" : "false"}
            aria-describedby="country-error"
          >
            <option value="">--Select Country--</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <span className="error" id="country-error" role="alert">
              {errors.country}
            </span>
          )}
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city">
            City<span aria-hidden="true">*</span>
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.city ? "true" : "false"}
            aria-describedby="city-error"
            disabled={!formData.country}
          >
            <option value="">--Select City--</option>
            {formData.country &&
              countryCityMap[formData.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {touched.city && errors.city && (
            <span className="error" id="city-error" role="alert">
              {errors.city}
            </span>
          )}
        </div>

        {/* PAN No */}
        <div className="form-group">
          <label htmlFor="pan">
            PAN No.<span aria-hidden="true">*</span>
          </label>
          <input
            id="pan"
            name="pan"
            type="text"
            value={formData.pan}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.pan ? "true" : "false"}
            aria-describedby="pan-error"
            maxLength="10"
            style={{ textTransform: "uppercase" }}
          />
          {touched.pan && errors.pan && (
            <span className="error" id="pan-error" role="alert">
              {errors.pan}
            </span>
          )}
        </div>

        {/* Aadhar No */}
        <div className="form-group">
          <label htmlFor="aadhar">
            Aadhar No.<span aria-hidden="true">*</span>
          </label>
          <input
            id="aadhar"
            name="aadhar"
            type="text"
            value={formData.aadhar}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={errors.aadhar ? "true" : "false"}
            aria-describedby="aadhar-error"
            maxLength="12"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {touched.aadhar && errors.aadhar && (
            <span className="error" id="aadhar-error" role="alert">
              {errors.aadhar}
            </span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
