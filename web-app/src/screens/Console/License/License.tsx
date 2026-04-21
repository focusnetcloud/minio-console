// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { AGPLV3DarkLogo, Box, PageLayout } from "mds";
import PageHeaderWrapper from "../Common/PageHeaderWrapper/PageHeaderWrapper";
import { setHelpName } from "../../../systemSlice";
import { AppState, useAppDispatch } from "../../../store";

const License = () => {
  const dispatch = useAppDispatch();
  const darkMode = useSelector((state: AppState) => state.system.darkMode);
  useEffect(() => {
    dispatch(setHelpName("license"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linkSx = {
    color: "#2781B0",
    fontWeight: 600,
  };

  return (
    <Fragment>
      <PageHeaderWrapper label="License" />

      <PageLayout>
        <Box
          sx={{
            marginTop: "40px",
            padding: "0 30px",
            "& a": linkSx,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
              justifyContent: "center",
              "& .min-icon": {
                width: "188px",
                height: "62px",
                filter: darkMode ? "brightness(0) invert(1)" : undefined,
              },
            }}
          >
            <AGPLV3DarkLogo />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            This software is licensed under the{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              rel="noopener"
            >
              GNU Affero General Public License v3.0
            </a>
            .
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            This application is based on MinIO Console and MinIO Design System,
            originally developed by MinIO, Inc., and modified by Focusnet GmbH
            in 2026.
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            In accordance with the AGPL v3, the complete corresponding source
            code of this modified software is available at:
          </Box>
          <ul
            style={{
              marginBottom: "20px",
              paddingLeft: "20px",
            }}
          >
            <li>
              <a
                href="https://github.com/focusnetcloud/minio-console"
                rel="noopener"
              >
                github.com/focusnetcloud/minio-console
              </a>
            </li>
            <li>
              <a
                href="https://github.com/focusnetcloud/minio-mds"
                rel="noopener"
              >
                github.com/focusnetcloud/minio-mds
              </a>
            </li>
            <li>
              <a href="https://github.com/minio/minio" rel="noopener">
                github.com/minio/minio
              </a>
              {" "}(unmodified)
            </li>
          </ul>
        </Box>
      </PageLayout>
    </Fragment>
  );
};

export default License;
