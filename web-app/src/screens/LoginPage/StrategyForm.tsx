// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
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

import React, { Fragment, useState } from "react";
import { Box, Button, DropdownSelector, LogoutIcon } from "mds";

import { RedirectRule } from "api/consoleApi";

const StrategyForm = ({ redirectRules }: { redirectRules: RedirectRule[] }) => {
  const [ssoOptionsOpen, ssoOptionsSetOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  let ssoOptions: any[] = [];

  if (redirectRules.length > 0) {
    ssoOptions = redirectRules.map((r) => ({
      label: `${r.displayName}${r.serviceType ? ` - ${r.serviceType}` : ""}`,
      value: r.redirect,
      icon: <LogoutIcon />,
    }));
  }

  const submitSSOInitRequest = (value: string) => {
    window.location.href = value;
  };

  return (
    <React.Fragment>
      {redirectRules.length > 0 && (
        <Fragment>
          <Box sx={{ marginBottom: 40 }}>
            <Button
              id={"SSOSelector"}
              variant={"subAction"}
              label={
                redirectRules.length === 1
                  ? `${redirectRules[0].displayName}${
                      redirectRules[0].serviceType
                        ? ` - ${redirectRules[0].serviceType}`
                        : ""
                    }`
                  : `Login with SSO`
              }
              fullWidth
              sx={{ height: 50 }}
              onClick={(e) => {
                if (redirectRules.length > 1) {
                  ssoOptionsSetOpen(!ssoOptionsOpen);
                  setAnchorEl(e.currentTarget);
                  return;
                }
                submitSSOInitRequest(`${redirectRules[0].redirect}`);
              }}
            />
            {redirectRules.length > 1 && (
              <DropdownSelector
                id={"redirect-rules"}
                options={ssoOptions}
                selectedOption={""}
                onSelect={(nValue) => submitSSOInitRequest(nValue)}
                hideTriggerAction={() => {
                  ssoOptionsSetOpen(false);
                }}
                open={ssoOptionsOpen}
                anchorEl={anchorEl}
                useAnchorWidth={true}
              />
            )}
          </Box>
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default StrategyForm;
