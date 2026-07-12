// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract SentinelAgentRegistry {


    struct Agent {

        uint256 agentId;

        address owner;

        string name;

        string[] capabilities;

        uint256 createdAt;

        uint256 reportsGenerated;

        bool active;

    }



    uint256 public nextAgentId = 1;



    mapping(uint256 => Agent) public agents;


    mapping(address => uint256) public ownerAgent;



    event AgentRegistered(

        uint256 indexed agentId,

        address indexed owner,

        string name

    );



    event ReportCountUpdated(

        uint256 indexed agentId,

        uint256 totalReports

    );




    function registerAgent(

        string memory name,

        string[] memory capabilities

    )

    public

    returns(uint256)

    {


        require(

            ownerAgent[msg.sender] == 0,

            "Agent already exists"

        );



        uint256 id = nextAgentId;


        nextAgentId++;



        agents[id] = Agent(

            id,

            msg.sender,

            name,

            capabilities,

            block.timestamp,

            0,

            true

        );



        ownerAgent[msg.sender] = id;



        emit AgentRegistered(

            id,

            msg.sender,

            name

        );



        return id;


    }




    function incrementReports(

        uint256 agentId

    )

    public

    {


        require(

            agents[agentId].active,

            "Agent inactive"

        );



        agents[agentId].reportsGenerated++;



        emit ReportCountUpdated(

            agentId,

            agents[agentId].reportsGenerated

        );


    }




    function getAgent(

        uint256 agentId

    )

    public

    view

    returns(Agent memory)

    {

        return agents[agentId];

    }


}