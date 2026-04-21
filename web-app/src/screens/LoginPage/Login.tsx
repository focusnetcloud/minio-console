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
import { useNavigate } from "react-router-dom";
import { Box, Button, Loader, LoginWrapper, RefreshIcon } from "mds";
import { loginStrategyType } from "./login.types";
import MainError from "../Console/Common/MainError/MainError";
import { AppState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getFetchConfigurationAsync } from "./loginThunks";
import { resetForm } from "./loginSlice";
import StrategyForm from "./StrategyForm";
import { RedirectRule } from "api/consoleApi";
import { redirectRules } from "./login.utils";
import { setHelpName } from "../../systemSlice";
import styled from "styled-components";
import get from "lodash/get";

const LoginTitle = styled.div(({ theme }) => ({
  fontSize: 28,
  color: get(theme, "fontColor", "#000"),
}));

const LoginSubtitle = styled.div(({ theme }) => ({
  fontSize: 14,
  marginBottom: 40,
  color: get(theme, "fontColor", "#000"),
}));

const ErrorText = styled.p(({ theme }) => ({
  textAlign: "center",
  color: get(theme, "fontColor", "#000"),
}));

export const getTargetPath = () => {
  let targetPath = "/browser";
  if (
    localStorage.getItem("redirect-path") &&
    localStorage.getItem("redirect-path") !== ""
  ) {
    targetPath = `${localStorage.getItem("redirect-path")}`;
    localStorage.setItem("redirect-path", "");
  }
  return targetPath;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginStrategy = useSelector(
    (state: AppState) => state.login.loginStrategy,
  );
  const loadingFetchConfiguration = useSelector(
    (state: AppState) => state.login.loadingFetchConfiguration,
  );
  const navigateTo = useSelector((state: AppState) => state.login.navigateTo);
  const backgroundAnimation = useSelector(
    (state: AppState) => state.login.backgroundAnimation,
  );

  useEffect(() => {
    if (navigateTo !== "") {
      dispatch(resetForm());
      navigate(navigateTo);
    }
  }, [navigateTo, dispatch, navigate]);

  useEffect(() => {
    if (loadingFetchConfiguration) {
      dispatch(getFetchConfigurationAsync());
    }
  }, [loadingFetchConfiguration, dispatch]);

  let loginComponent;

  switch (loginStrategy.loginStrategy) {
    case loginStrategyType.redirect:
    case loginStrategyType.form: {
      let redirectItems: RedirectRule[] = [];

      if (
        loginStrategy.redirectRules &&
        loginStrategy.redirectRules.length > 0
      ) {
        redirectItems = [...loginStrategy.redirectRules].sort(redirectRules);
      }

      loginComponent = <StrategyForm redirectRules={redirectItems} />;
      break;
    }
    default:
      loginComponent = (
        <Box
          sx={{
            textAlign: "center",
            "& .loadingLoginStrategy": {
              textAlign: "center",
              width: 40,
              height: 40,
            },
            "& .buttonRetry": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {loadingFetchConfiguration ? (
            <Loader className={"loadingLoginStrategy"} />
          ) : (
            <Fragment>
              <Box>
                <ErrorText>
                  An error has occurred
                  <br />
                  The backend cannot be reached.
                </ErrorText>
              </Box>
              <div className={"buttonRetry"}>
                <Button
                  onClick={() => {
                    dispatch(getFetchConfigurationAsync());
                  }}
                  icon={<RefreshIcon />}
                  iconLocation={"end"}
                  variant="regular"
                  id="retry"
                  label={"Retry"}
                />
              </div>
            </Fragment>
          )}
        </Box>
      );
  }

  useEffect(() => {
    dispatch(setHelpName("login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <MainError />
      <LoginWrapper
        logoProps={{
          applicationName: "custom",
          customLogoSrc: "/images/custom_logo.png",
        }}
        form={
          <>
            <LoginTitle>Object Storage</LoginTitle>
            <LoginSubtitle>Exclusively hosted in Germany 🇩🇪</LoginSubtitle>
            {loginComponent}
          </>
        }
        formFooter={
          <Box
            sx={{
              "& .separator": {
                marginLeft: 4,
                marginRight: 4,
              },
            }}
          >
            <a
              href="https://ioc.focusnet.de"
              target="_blank"
              rel="noopener"
            >
              Support
            </a>
          </Box>
        }
        backgroundAnimation={backgroundAnimation}
      />
    </Fragment>
  );
};

export default Login;
