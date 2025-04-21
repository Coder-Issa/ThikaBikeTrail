
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-bike-dark mb-4">About Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Learn about our journey, mission, and the passionate team behind Thika Bikes Trail Hub.
          </p>
        </div>

        {/* About Us Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-bike-dark mb-6">Our Story</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                We began from our co-founder mechanic Masha Ramadhan who was first an employ of this workplace and found a way out of the working cycle of being hired to one day buying this whole establishment and making it his own.
              </p>
              <p>
                Through the help of his brother Nick by his side, they both sprung this place from what it once was to this fine beautiful place that attracts bikers and random civilian cyclist.
              </p>
              <p>
                As of today, hundreds of local cyclists and almost country wide are familiar with this workplace due to its high quality services both to the bicycles and the customers themselves.
              </p>
              <p>
                We pride ourselves in knowing that we make the roads more safer by all the hardwork we do here of fine tuning these machines to perfection. I hope that our customers keep on spreading positive information about us to the friends so that we can all receive astonishing services.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1605271864611-58dd08d10547?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZSUyMHNob3B8ZW58MHx8MHx8fDA%3D" 
              alt="Bicycle shop interior" 
              className="rounded-lg shadow-lg w-full h-full object-cover max-h-[500px]"
            />
          </div>
        </section>

        {/* Our Team Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <img 
              src="https://media.istockphoto.com/id/2079720331/photo/team-of-mechanics-working-at-a-repair-shop-fixing-a-bicycle.webp?a=1&b=1&s=612x612&w=0&k=20&c=tEaVsnprut6PbJYVjg6yTD11lvcLqHRqeXHDu9cWhBY=" 
              alt="Bicycle repair team" 
              className="rounded-lg shadow-lg w-full h-full object-cover max-h-[500px]"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-bike-dark mb-6">Our Team</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                The services offered here are brought to you by our exemplary men and women who work for you the customer with both zest and passion to ensure you are satisfied with the performance of you bicycle afterwards its repair.
              </p>
              <p>
                There are currently a bunch of dozen or more workers who are ready to serve you the customer in anyway regarding on matters pertaining your bicycle problems, issues or whatever the case.
              </p>
              <p>
                Feel free to reach out to any worker in our fine establishment to help you out or answer any of your questions...and as always "the customer is always right".
              </p>
            </div>
          </div>
        </section>

        {/* Working Hours Section */}
        <section className="bg-bike-dark text-white p-10 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Working Hours</h2>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between py-3 border-b border-white/20">
              <span className="font-medium">Monday - Thursday</span>
              <span>10:00am - 7:00pm</span>
            </div>
            <div className="flex justify-between py-3 border-b border-white/20">
              <span className="font-medium">Friday</span>
              <span className="text-bike-secondary font-bold">Closed</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-medium">Saturday - Sunday</span>
              <span>10:00am - 7:00pm</span>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-bike-dark mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We use only the highest quality parts and tools to ensure your bicycle performs at its best.",
                icon: "⭐️"
              },
              {
                title: "Expertise",
                description: "Our team has years of experience in bicycle repair and maintenance, providing expert service every time.",
                icon: "🔧"
              },
              {
                title: "Customer Focus",
                description: "We put our customers first, ensuring you have the best experience possible with every visit.",
                icon: "👥"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-bike-dark">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;