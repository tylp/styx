use lapin::{
    message::DeliveryResult,
    options::{BasicAckOptions, BasicConsumeOptions, BasicPublishOptions, QueueDeclareOptions},
    protocol::connection,
    types::FieldTable,
    BasicProperties, Connection, ConnectionProperties,
};

use tracing::{info, Level};
use tracing_subscriber::FmtSubscriber;

#[tokio::main]
async fn main() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::TRACE)
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");

    // The provided number is actually the virtual name of the pin (eg: GPIO21) and not the actual number of the pin.
    // let mut gpio7 = gpio::sysfs::SysFsGpioOutput::open(21).unwrap();
    // let mut value = false;

    // loop {
    //     gpio7.set_value(value).expect("Could not set gpio7");
    //     thread::sleep(time::Duration::from_millis(1000));

    //     value = !value;
    // }

    let uri = "amqp://admin:admin@192.168.1.83:5672";
    let options = ConnectionProperties::default()
        .with_executor(tokio_executor_trait::Tokio::current())
        .with_reactor(tokio_reactor_trait::Tokio);

    let connection = Connection::connect(uri, options).await.unwrap();
    let channel = connection.create_channel().await.unwrap();

	info!("Declaring channel...");
    let _queue = channel
        .queue_declare(
            "hello",
            QueueDeclareOptions::default(),
            FieldTable::default(),
        )
        .await
        .unwrap();

	info!("Publishing...");
    channel
        .basic_publish(
            "",
            "hello",
            BasicPublishOptions::default(),
            b"Hello world!",
            BasicProperties::default(),
        )
        .await
        .unwrap()
        .await
        .unwrap();

    // let consumer = channel
    //     .basic_consume(
    //         "queue_test",
    //         "tag_foo",
    //         BasicConsumeOptions::default(),
    //         FieldTable::default(),
    //     )
    //     .await
    //     .unwrap();

    // consumer.set_delegate(move |delivery: DeliveryResult| async move {
    //     let delivery = match delivery {
    //         // Carries the delivery alongside its channel
    //         Ok(Some(delivery)) => delivery,
    //         // The consumer got canceled
    //         Ok(None) => return,
    //         // Carries the error and is always followed by Ok(None)
    //         Err(error) => {
    //             dbg!("Failed to consume queue message {}", error);
    //             return;
    //         }
    //     };

    //     // Do something with the delivery data (The message payload)

    //     delivery
    //         .ack(BasicAckOptions::default())
    //         .await
    //         .expect("Failed to ack send_webhook_event message");
    // });
}
