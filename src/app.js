import express from "express";

import academicSessionRoutes from "./routes/academic-session.routes.js";
import classRoutes from "./routes/class.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import classSubjectRoutes from "./routes/class-subject.routes.js";
import studentRoutes from "./routes/student.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "School API is running"
    });
});

app.use(
    "/api/v1/academic-sessions",
    academicSessionRoutes
);

app.use(
    "/api/v1/classes",
    classRoutes
);

app.use(
    "/api/v1/teachers",
    teacherRoutes
);

app.use(
    "/api/v1/subjects",
    subjectRoutes
);
app.use(
    "/api/v1/class-subjects",
    classSubjectRoutes
);

app.use(
    "/api/v1/students",
    studentRoutes
);

app.use(
    "/api/v1/enrollments",
    enrollmentRoutes
);

app.use(
    "/api/v1/auth",
    authRoutes
);

app.use(
    "/api/v1/users",
    userRoutes
);
app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;