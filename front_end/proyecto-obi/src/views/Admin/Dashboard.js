import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Dashboard() {

  return (
    <div>
      <h3>Hola Papus Admin de la OLimpiada  { cookies.get('username')}mm</h3>
    </div>
  );
}
