import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SentinelAgentRegistryModule =
buildModule(
    "SentinelAgentRegistryModule",
    (m) => {


        const registry =
        m.contract(
            "SentinelAgentRegistry"
        );


        return {
            registry
        };

    }
);


export default SentinelAgentRegistryModule;