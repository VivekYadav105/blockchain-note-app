// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Note{
    NoteStruct[] public notes;
    uint public noteCount;

    struct NoteStruct{
        string id;
        string note;
        string[] tags;
        string heading;
    }

    function generateRandomNumber() internal view returns(uint256){
        uint256 blockNumber = block.number;
        uint256 timestamp = block.timestamp;        
        uint256 seed = uint256(keccak256(abi.encodePacked(blockNumber, timestamp)));
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(seed, blockhash(blockNumber))));
        return randomNumber;
    }

     function generateRandomString() internal view returns(string memory) {
        uint256 blockNumber = block.number;
        uint256 timestamp = block.timestamp;
        uint256 seed = uint256(keccak256(abi.encodePacked(blockNumber, timestamp)));
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(seed, blockhash(blockNumber))));
        string memory randomString = generateAlphabeticalString(randomNumber % 100000,5);
        return randomString;
    }

    function generateAlphabeticalString(uint256 value, uint256 length) internal pure returns (string memory) {
        require(length > 0, "Length must be greater than 0");
        string memory alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        bytes memory result = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = bytes(alphabet)[value % 52];
            value /= 52; // 26 lowercase + 26 uppercase letters
        }
        return string(result);
    }

    function createNote(string memory note,string[] memory tags,string memory heading) public returns (bool){
        require(bytes(heading).length > 0, "Length must be greater than 0");
        require(bytes(note).length > 0, "Length must be greater than 0");
        string memory id =generateRandomString(); 
        NoteStruct memory new_note = NoteStruct(id,note,tags,heading);
        notes.push(new_note);
        return true;
    }

    function editNote(string memory id,string memory note,string[] memory tags,string memory heading) public returns(bool) {
        require(bytes(id).length>0,"Id should be defined");
        for(uint i=0;i<notes.length;i++){
            if(keccak256(abi.encodePacked(notes[i].id))==keccak256(abi.encodePacked(id))){
                notes[i].heading = heading;
                notes[i].note = note;
                notes[i].tags = tags;
            }
        }
        return true;
    }

    function deleteNote(string memory id) public{
        require(bytes(id).length>0,"Id should be defined");
        bool found = false;
        NoteStruct memory temp;
        for(uint i=0;i<notes.length-1;i++){
            if(keccak256(abi.encodePacked(notes[i].id))==keccak256(abi.encodePacked(id))){
                found = true;
            }
            if(found){
                temp = notes[i];
                notes[i] = notes[i+1];
                notes[i+1] = temp;
            }
            delete notes[notes.length-1];
        }
    }

    function getNotes() public view returns(NoteStruct[] memory){
        return notes;
    }

    function getNote(string memory id) public view returns(NoteStruct memory){
        require(bytes(id).length>0,"id is required");
        NoteStruct memory note;
        for(uint i=0;i<notes.length;i++){
            if(keccak256(abi.encodePacked(notes[i].id))==keccak256(abi.encodePacked(id))){
                note = notes[i];
                break;
            }
        }
        return note;
    }
}