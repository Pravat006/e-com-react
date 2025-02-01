import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import customerService from "@/services/customer.service";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import authService from "@/services/auth.service";
import { Link } from "react-router-dom";
function Profile() {
  const [profile, setProfile] = React.useState();
  const authData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  const handleAvatarChange = async () => {
    await authService.changeAvatar();
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await authService.currentUser();
      const res = await customerService.getProfile();
      if (res) {
        console.log(res);
        setProfile(res?.data);
      }
    };
    handleAvatarChange();
    fetchProfile();
  }, []);
  if (!authStatus)
    return (
      <div>
        <div>
          <Link to={"/login"} className="text-blue-600 text-xl">
            Login
          </Link>
          <span> See your profile</span>
        </div>
      </div>
    );

  return (
    authStatus && (
      <Card className="w-full max-w-md mx-auto mt-10 p-4 border shadow-lg">
        <CardHeader>
          <div className="flex justify-center items-center">
            <img
              src={authData?.user.avatar.url}
              alt="xyz"
              className="rounded-full h-32 w-32 bg-gray-200"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            <p>
              <span className="font-semibold">Name:</span> {profile?.firstName}{" "}
              {profile?.lastName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {profile?.countryCode} {profile?.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(profile?.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(profile?.updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white hover:bg-blue-600">
              Update Profile
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500">
                  change avatar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>change new avatar</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <Input type="file" />
                  <Button
                    variant="outline"
                    className="bg-blue-500"
                    onClick={() => handleAvatarChange()}
                  >
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    )
  );
}

export default Profile;
