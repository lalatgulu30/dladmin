import './SFBanner.css'
function Banner() {
  return (
    <div className='sf-banner'>
      <text className='sf-font'>StateFarm </text>
      <text className='sf-b2b-font'>| B2B Delegated Administration</text>
      <text>
        <a className='sf-banner-logout' href="https://statefarm.com">Log Out</a>
      </text>
    </div>
  );
}
export default Banner;
