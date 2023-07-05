// const ChatRoomList = () => {
//     const [userRoomDocs, setUserRoomDocs] = useState([]);

//     const token = localStorage.getItem("token");
//     var useremail = jwt_decode(token).userDetails.email;

//     useEffect(() => {
//         Axios.patch("http://localhost:5000/api/chats/" + useremail, {
//             newMessage: message,
//             currentChatHistory: chat,
//         }).then((res) => {
//             setUserRoomDocs([...userRoomDocs, res]);
//         });
//     }, []);

//     const userRoomDocsUI = userRoomDocs.map(async (roomDocs, roomIndex) => {

//         const buddyEmail = roomDocs.participants.filter(maybeBuddy => maybeBuddy.localeCompare(userEmail) !== 0)[0];
//         var buddyUserName = "";
//         await Axios.get("http://localhost:5000/api/user-details/biography/" + buddyEmail).then((res) => {
//             buddyUserName = res.username
//         });

//         return(<div>{buddyUserName}</div>)
//     });

//     return (
//         <div>
//             {userRoomDocsUI}
//         </div>
//     )
// }