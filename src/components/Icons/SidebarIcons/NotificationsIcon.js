import React from "react";

class NotificationsIcon extends React.Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.3338 9.19142V9.04543C2.35522 8.61351 2.49365 8.195 2.73482 7.83308C3.13625 7.39832 3.41105 6.86555 3.53039 6.29066C3.53039 5.84634 3.53039 5.39568 3.5692 4.95136C3.76971 2.81229 5.88477 1.33334 7.97396 1.33334H8.0257C10.1149 1.33334 12.2299 2.81229 12.4369 4.95136C12.4757 5.39568 12.4369 5.84634 12.4693 6.29066C12.5902 6.86688 12.8647 7.40131 13.2648 7.83943C13.5078 8.19815 13.6465 8.61512 13.6659 9.04543V9.18508C13.6803 9.76537 13.4804 10.3312 13.1031 10.7783C12.6046 11.301 11.928 11.6262 11.2015 11.6923C9.07125 11.9208 6.92194 11.9208 4.79167 11.6923C4.06601 11.6233 3.39042 11.2986 2.89006 10.7783C2.51859 10.3309 2.32141 9.7684 2.3338 9.19142Z"
          stroke="#16365F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.36987 13.9012C6.70272 14.319 7.19151 14.5893 7.72807 14.6525C8.26462 14.7156 8.80469 14.5663 9.22876 14.2376C9.35918 14.1404 9.47654 14.0273 9.57803 13.9012"
          stroke="#16365F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export default NotificationsIcon;
