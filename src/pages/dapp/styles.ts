interface ModalStyle {
    overlay: {
      background: string;
    };
    content: {
      padding: string;
      top: string;
      border: number;
      width: string;
      height: string;
      margin: string;
      background: string;
      borderRadius: string;
    };
  }
  
  const reviewModalStyle: ModalStyle = {
    overlay: {
      background: "#D0D5DD75",
    },
    content: {
      padding: "24px",
      border: 0,
      width: "512px",
      height: "512px",
      margin: "0 auto",
      background: "#F2F4F7",
      borderRadius: "16px",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  // Add media query for mobile screens
  @media (max-width: 767px) {
    reviewModalStyle.content.top = "25%";
    // reviewModalStyle.content.left = "50%";
  }
  
  export default reviewModalStyle;