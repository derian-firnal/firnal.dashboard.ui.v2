export default function IntentSearch() {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-screen" onContextMenu={handleContextMenu}>
      <iframe
        src="https://ldww.tag4.org/"
        className="w-full h-full"
        title="Snapshot"
      />
    </div>
  );
}


// export default function SearchB2B() {
//   const handleContextMenu = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="relative w-full h-screen" onContextMenu={handleContextMenu}>
//       <iframe
//         src="http://localhost:5223/api/Tag4/proxy"
//         className="w-full h-full"
//         title="ProxiedSnapshot"
//       />
//     </div>
//   );
// }