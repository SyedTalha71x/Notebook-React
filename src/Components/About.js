import noteContext from '../Context/Notes/noteContext';


const About = (props) => {
  const showinfo = ()=>{
    const d1 = new Date();
    d1.getFullYear();
  }
    return (
    <div className="container">
      <div className="about_us_page">
        <div className="about-content">
          <h2>About Us</h2>
          <p>A perfect Notebook-Application, where you can access or save your Notes</p>
          <div className="copyright">
            Made by <span>Talha Hussain</span>
          </div>
        </div>
      </div>
    </div>
     

  )
}

export default About;
