import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SentinelReportModule =
buildModule(
    "SentinelReportModule",
    (m) => {


        const sentinel =
        m.contract(
            "SentinelReport"
        );


        return {
            sentinel
        };

    }
);


export default SentinelReportModule;