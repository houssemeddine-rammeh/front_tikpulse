import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DiamondIcon from "@mui/icons-material/Diamond";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Email,
  Favorite,
  Group,
  GroupAdd,
  LocalPhone,
  OndemandVideo,
  Visibility,
} from "@mui/icons-material";
import moment from "moment";

export default function ProfilePage({ creator }) {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9fb", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>

      {/* Profile Card */}
      <Card sx={{ borderRadius: 4, p: 3, mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={creator?.avatar}
            alt={creator?.username}
            sx={{ width: 72, height: 72 }}
          />
          <Box>
            <Typography variant="h6">{creator?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{creator?.tikTokId}
              {creator?.category && (
                <Chip label={creator.category} size="small" sx={{ ml: 1 }} />
              )}
            </Typography>
          </Box>
        </Stack>

        <CardContent sx={{ pl: 0 }}>
          <Typography variant="body1" mt={2}>
            {creator?.bio}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mt={2}
            flexWrap="wrap"
            rowGap={1}
          >
            <Typography variant="body2" display="flex" alignItems="center">
              <GroupAdd fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Joined: {moment(creator?.joinDate).format("MMM DD, YYYY")}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Group fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Following: {creator?.profile?.subscribers}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <OndemandVideo
                fontSize="small"
                sx={{ mr: 0.5 }}
                color="secondary"
              />
              Videos: {creator?.profile?.videos}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Group fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Followers: {creator?.profile?.followers?.toLocaleString()}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Favorite fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Likes: {creator?.profile?.likes?.toLocaleString()}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Visibility fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Views: {creator?.profile?.views?.toLocaleString()}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={4} flexWrap="wrap" rowGap={1}>
            {creator?.phone && (
              <Typography variant="body2" display="flex" alignItems="center">
                <LocalPhone
                  fontSize="small"
                  sx={{ mr: 0.5 }}
                  color="secondary"
                />
                {creator.phone}
              </Typography>
            )}
            {creator?.email && (
              <Typography variant="body2" display="flex" alignItems="center">
                <Email fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
                {creator.email}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Contract Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Contract Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarMonthIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Contract Start
                </Typography>
                <Typography fontWeight="bold">
                  {moment(creator?.profile?.joinDate).format("MMM DD, YYYY")}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccessTimeIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Contract Duration
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.contractDuration}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccessTimeIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Days with Agency
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.profile?.daysSinceJoining}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <DiamondIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Diamonds Collected
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.profile?.diamonds?.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Details */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Payment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountBalanceIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  RIB (Bank Account)
                </Typography>
                <Typography fontWeight="bold">{creator?.rib}</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
