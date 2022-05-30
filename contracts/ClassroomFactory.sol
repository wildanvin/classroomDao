// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./Classroom.sol";

/// @title The Classroom Factory contract
/// @author Wilman D. Vinueza
/// @notice This is the contract that will create and store all the classrooms

contract ClassroomFactory{
    
    ///@notice In this array the classrooms will be stored
    Classroom[] public classrooms;
    
    function createClassroom(uint _sessions) public {
        Classroom classroom = (new Classroom)(payable(msg.sender), _sessions);
        classrooms.push(classroom);
    }
    
    /// @notice This function will retrieve the info of each classroom
    /// @param _index The index in the classrooms array
    function getClassroom(uint _index)
        public
        view
        returns (  
            uint numOfParticipants,
            uint numConfirmationsRequired,
            uint sessions,
            uint balance,
            address classroomAddress
        )
    {
        Classroom classroom = classrooms[_index];
        
        return (
            classroom.numOfParticipants(),
            classroom.numConfirmationsRequired(),
            classroom.sessions(),
            address(classroom).balance,
            classroom.classroomAddress()
        );
        
    }

    function getTotalClassrooms() public view returns(uint count) {
        return classrooms.length;
    }
}










