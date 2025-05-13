import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import useDashboard from "../../context/dashboard/useDashboard";
import { BadgeCheck, Ban, Hourglass, LoaderCircle, Wallet } from "lucide-react";

const StatusData = () => {
  const { statusData, isLoading } = useDashboard();

  const Loading = <LoaderCircle className="text-primary animate-spin" />;

  return (
    <div className="grid grid-cols-auto-fill-200 gap-4 mb-5">
      <Card>
        <CardHeader className="-mb-3">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="text-primary" />
            <span className="text-gray-700">Total</span>
          </CardTitle>
        </CardHeader>
        <CardContent
          className="text-2xl font-semibold truncate"
          title={(statusData?.total || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        >
          {isLoading
            ? Loading
            : (statusData?.total || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="-mb-3">
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="text-primary" />
            <span className="text-gray-700">Pago</span>
          </CardTitle>
        </CardHeader>
        <CardContent
          className="text-2xl font-semibold truncate"
          title={(statusData?.paid || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        >
          {isLoading
            ? Loading
            : (statusData?.paid || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="-mb-3">
          <CardTitle className="flex items-center gap-2">
            <Hourglass className="text-orange-400" />
            <span className="text-gray-700">Pendente</span>
          </CardTitle>
        </CardHeader>
        <CardContent
          className="text-2xl font-semibold truncate"
          title={(statusData?.pending || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        >
          {isLoading
            ? Loading
            : (statusData?.pending || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="-mb-3">
          <CardTitle className="flex items-center gap-2">
            <Ban className="text-red-500" />
            <span className="text-gray-700">Cancelado</span>
          </CardTitle>
        </CardHeader>
        <CardContent
          className="text-2xl font-semibold truncate"
          title={(statusData?.cancelled || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        >
          {isLoading
            ? Loading
            : (statusData?.cancelled || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusData;
