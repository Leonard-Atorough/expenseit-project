export function Aside() {
  return `
    <aside class="main-sidebar">
      <nav class="main-nav" id="mainNavbar" aria-label="Main Menu">
        <ul class="main-nav-list">
          <li class="tab"> 
            <a href="/dashboard"> Dashboard </a>
          </li> 
          <li class="tab"> 
            <a href="/transactions"> Transactions </a>
          </li> 
          <li class="tab"> 
            <a href="/account"> Account </a>
          </li> 
          <li class="tab"> 
            <a href="/settings"> Settings </a>
          </li> 
        </ul>
      </nav>
    </aside>
    `;
}
