// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract SentinelReport {


    struct Report {

        address user;

        string asset;

        uint256 riskScore;

        string decision;

        uint256 timestamp;

        string reportHash;

    }



    Report[] public reports;



    event ReportStored(

        address indexed user,

        string asset,

        uint256 riskScore

    );




    function storeReport(

        string memory asset,

        uint256 riskScore,

        string memory decision,

        string memory reportHash

    )
    public {


        reports.push(

            Report(

                msg.sender,

                asset,

                riskScore,

                decision,

                block.timestamp,

                reportHash

            )

        );



        emit ReportStored(

            msg.sender,

            asset,

            riskScore

        );

    }




    function getReports()

    public

    view

    returns(Report[] memory)

    {

        return reports;

    }


}