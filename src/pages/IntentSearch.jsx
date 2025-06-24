import { useState, useEffect } from "react";

export default function IntentSearch() {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const [src, setSrc] = useState("https://ldww.tag4.org/");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    console.log('user', user)
    if (user?.email.includes("legacyplus")) {
      setSrc(`https://ldww.tag4.org/`);
    }
    else {
      setSrc(`https://firnalorg.tag4.org/`);
    }
  }, []);

  return (
    <div className="relative w-full h-screen" onContextMenu={handleContextMenu}>
      <iframe
        src={src}
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