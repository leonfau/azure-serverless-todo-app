import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

export function useBroadcastUpdate(cb: Function): HubConnection {
  const [activeConnection, setActiveConnection] = useState<HubConnection>();

  useEffect(() => {
    if(activeConnection  && activeConnection.state == HubConnectionState.Connected){
      return;
    }
    const connection: HubConnection = new HubConnectionBuilder()
        .withUrl(`${window.location.origin}/api/v1`)
        .configureLogging(LogLevel.Debug)
        .build();

    connection.start()
        .then(() => console.log('connected'))
        .catch(console.error);

    setActiveConnection(connection);

    connection.on('taskUpdate', message => {
      cb && cb();
    });

    return function cleanup(){
      console.log("cleanup connection");
      activeConnection.stop()
        .then(r => console.log(r));
    }
  }, [])

  return activeConnection;
}
