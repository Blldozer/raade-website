
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Ticket, DollarSign } from "lucide-react";

const Conference = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      {/* Main Conference Info */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-raade-navy mb-4 text-center font-zillaslab">
          RAADE Annual Conference 2025
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto font-merriweather">
          Join us for two days of inspiring discussions, networking, and innovation
          in African development
        </p>

        {/* Event Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Calendar className="h-6 w-6 text-raade-gold" />
              <CardTitle className="text-lg font-alegreyasans">Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-merriweather">April 11-12, 2025</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Users className="h-6 w-6 text-raade-gold" />
              <CardTitle className="text-lg font-alegreyasans">Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-merriweather">200+ Expected</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Ticket className="h-6 w-6 text-raade-gold" />
              <CardTitle className="text-lg font-alegreyasans">Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-merriweather">Early Bird Open</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <DollarSign className="h-6 w-6 text-raade-gold" />
              <CardTitle className="text-lg font-alegreyasans">Sponsorship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-merriweather">Opportunities Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Speakers Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-raade-navy mb-8 text-center font-zillaslab">
            Featured Speakers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((speaker) => (
              <Card key={speaker} className="bg-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-raade-navy text-center font-alegreyasans">
                    Speaker Name
                  </h4>
                  <p className="text-gray-600 text-center font-merriweather">Organization</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration CTA */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-raade-navy mb-4 font-zillaslab">
            Join Us at the Conference
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-merriweather">
            Be part of the conversation shaping the future of African development.
            Early bird registration is now open!
          </p>
          <Button
            size="lg"
            className="bg-raade-navy hover:bg-raade-navy/90 text-white font-alegreyasans"
          >
            Register Now
          </Button>
        </div>

        {/* Sponsorship Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-raade-navy mb-4 font-zillaslab">
            Become a Sponsor
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-merriweather">
            Support innovation in African development by becoming a conference
            sponsor. Various packages available.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-raade-navy text-raade-navy hover:bg-raade-navy hover:text-white font-alegreyasans"
          >
            Sponsorship Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Conference;
