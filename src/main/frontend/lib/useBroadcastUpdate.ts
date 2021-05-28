import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

export function useBroadcastUpdate(onTaskUpdate: () => void) {
  return useEffect(() => {
    const connection: HubConnection = new HubConnectionBuilder()
        .withUrl(`${window.location.origin}/api/v1`)
        .configureLogging(LogLevel.Debug)
        .build();

    connection.start()
        .then(() => console.log('connected'))
        .catch(console.error);

    connection.on('taskUpdate', message => onTaskUpdate());

    return () => {
      console.log('cleanup connection');
      connection.stop();
    }
  }, [])
}
