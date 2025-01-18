import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";

const HIPAACertificate = (props) => {
  useEffect(() => {
    window.open(
      "https://acwocotrngkeaxtzdzfz.supabase.co/storage/v1/object/public/images/Nargel_velasco_hth_hipaa.pdf"
    );
  }, []);
  const openHandler = () => {
    window.open(
      "https://acwocotrngkeaxtzdzfz.supabase.co/storage/v1/object/public/images/Nargel_velasco_hth_hipaa.pdf"
    );
  };
  return (
    <div>
      <Typography variant="h6">
        Certification successfully downloaded. Check your download file
      </Typography>
      <Button variant="contained" color="primary" onClick={() => openHandler()}>
        Open
      </Button>
    </div>
  );
};

export default HIPAACertificate;
