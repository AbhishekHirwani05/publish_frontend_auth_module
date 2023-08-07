module.exports = `import Header from 'components/Header/Header.component';
import AppSidebar from 'components/Sidebar/Sidebar.component';
import MainHome from 'components/Auth/home/MainHome.component';

/* this is the landing page for the project which
 includes the header and sidemenu */
const MainPage: React.FC<Record<string, unknown>> = () => (
  <>
    <Header />
    <MainHome />
    <AppSidebar />
  </>
);
export default MainPage;
`;
