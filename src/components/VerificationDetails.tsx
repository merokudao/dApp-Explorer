import React from "react";
import Image from "next/image";
import moment from "moment";

export type verifiedType = {
  resultURL: string;
  icon: string;
  description: string;
  type: string;
  vendorName: string;
  verifiedOn: string;
  verificationExpires: string;
};

export type VerificationDetailsProps = {
  verification: {
    icon: string;
    verified: verifiedType[];
  };
};

const VerificationDetails = ({ verification }: VerificationDetailsProps) => {
  return (
    <div id="verification-section">
      <h1 className="text-2xl leading-2xl font-[500] mb-4">Verification</h1>
      {verification?.verified &&
        verification?.verified.map((item, index) => (
          <>
          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-y-4 gap-x-5 mt-6 md:mt-0 w-full justify-between">
            <div>
              <label>Verifier</label> <p>{item.vendorName}</p>
            </div>
            <div>
              <label>Verifier Icon</label>
              <Image alt="icon" height={30} width={30} src={item?.icon} />
            </div>
            <div>
              <label>Verified On</label>{" "}
              <p>{moment(item?.verifiedOn).format("DD/MM/YYYY")}</p>
            </div>
            <div>
              <label>Verification Expires On</label>{" "}
              <p>{moment(item?.verificationExpires).format("DD/MM/YYYY")}</p>
            </div>
            <div>
              <label>Description</label> <p>{item?.description}</p>
            </div>
            <div>
              <label>Report</label>{" "}
              <p>
                <a
                  className="text-blue-500"
                  target="_blank"
                  href={item?.resultURL}
                >
                  View Report
                </a>
              </p>
            </div>
          </div>
          {index !== verification?.verified.length - 1 && <hr className="m-2 my-5"/>}
          </>
        ))}
    </div>
  );
};

export default VerificationDetails;
