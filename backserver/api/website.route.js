import express from 'express';
import userDetail from './users.controller.js';
import eventDetail from './events.controller.js';
import leaveDetail from './leave.controller.js';

const router = express.Router();

router.post('/users',userDetail.getUserDetails);

router.get('/events',eventDetail.apiGetEvents)

router.post('/eventsfilter',eventDetail.apigetEventsByDateRange)

router.post('/odfilter',leaveDetail.apigetOdByFilter)

router.post('/leaves',leaveDetail.apiGetLeaveByDate)

router.get('/leavesall',leaveDetail.apiGetAllLeaves)

router.post('/eventod',leaveDetail.apiPutEventOd)

router.post('/username',userDetail.getUserName)

router.post('/teafilter',leaveDetail.apigetTeaByFilter)

router.post('/eventadd',eventDetail.apiPutEvent)

export default router;

