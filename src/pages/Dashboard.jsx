import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Users, DollarSign, Calendar, Dumbbell } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Members",
      value: "1,234",
      change: "+12.5%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Today",
      value: "156",
      change: "+8.2%",
      icon: Activity,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+23.1%",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Growth Rate",
      value: "18.9%",
      change: "+4.3%",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const recentActivities = [
    { type: "New member registered", member: "John Smith", time: "5 mins ago" },
    { type: "Payment received", member: "Sarah Johnson", time: "12 mins ago" },
    { type: "Class booking", member: "Mike Wilson", time: "25 mins ago" },
    { type: "Equipment maintenance", member: "Treadmill #5", time: "1 hour ago" },
  ];

  const upcomingClasses = [
    { name: "Yoga Session", time: "10:00 AM", trainer: "Emma Davis", spots: 8 },
    { name: "HIIT Training", time: "11:30 AM", trainer: "Alex Turner", spots: 5 },
    { name: "Spin Class", time: "2:00 PM", trainer: "Lisa Brown", spots: 12 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout username="John Doe">
      <div className="space-y-6">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                        <p className="text-sm text-green-600 mt-2 font-medium">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full bg-${stat.color}-100`}
                      >
                        <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity & Upcoming Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your health club
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type}
                        </p>
                        <p className="text-xs text-gray-600">{activity.member}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Classes
                </CardTitle>
                <CardDescription>
                  Today's scheduled classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg">
                          <Dumbbell className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {classItem.name}
                          </p>
                          <p className="text-xs text-gray-600">{classItem.trainer}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{classItem.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{classItem.spots}</p>
                        <p className="text-xs text-gray-500">spots left</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks for efficient management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Add New Member",
                  "Schedule Class",
                  "Process Payment",
                  "Generate Report"
                ].map((action) => (
                  <motion.button
                    key={action}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:shadow-md"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
