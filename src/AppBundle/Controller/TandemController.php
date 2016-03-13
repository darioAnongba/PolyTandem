<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Discussion;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/tandem")
 */
class TandemController extends Controller
{
    /**
     * @Route("/live", name="tandem-live")
     */
    public function tandemLiveAction(Request $request)
    {
        $learn = $request->request->get('learn');

        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('AppBundle:Discussion');
        $discussion = $repo->findOneBy([
            'guest' => null,
            'hostSpeaks' => $learn,
            'hostLearns' => $this->getUser()->getLanguage()
        ]);

        if($discussion !== null)
        {
            $discussion->setGuest($this->getUser());

            $em->persist($discussion);
            $em->flush();

            return $this->render('tandem/tandem-live.html.twig', [
                'discussion' => $discussion,
                'isConnected' => true
            ]);
        }

        $discussion = new Discussion($this->getUser(), $this->getUser()->getLanguage(), $learn);

        $em->persist($discussion);
        $em->flush();

        return $this->render('tandem/tandem-live.html.twig', [
            'discussion' => $discussion,
            'learn' => $learn,
            'isConnected' => false
        ]);
    }

    /**
     * @Route("/refresh", name="tandem-refresh")
     */
    public function tandemRefresh(Request $request)
    {
        $id = $request->get('id');

        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('AppBundle:Discussion');
        $discussion = $repository->find($id);

        if($discussion === null) {
            throw $this->createNotFoundException('Discussion not found');
        }

        if($discussion->getGuest() === null) {
            $output = array(
                'success' => false
            );
        }
        else {
            $output = array(
                'success' => true,
                'view' => $this->render('tandem/panel.html.twig', ['discussion' => $discussion])->getContent()
            );
        }

        return new JsonResponse($output);
    }

    /**
     * @Route("/delete", name="tandem-delete")
     */
    public function deleteAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('AppBundle:Discussion');
        $discussions = $repository->findBy(['guest' => null]);

        foreach ($discussions as $discussion) {
            $em->remove($discussion);
        }

        $em->flush();

        return $this->redirectToRoute('homepage');
    }
}